import _ from 'lodash'
import { vi } from 'vitest'

import * as APISelections from 'Api/Selections/api/endpoints'

import { accessoryEngine, calculateConnectionSpeed } from '../functions'

vi.mock('Api/Selections/api/endpoints', () => ({
  updateConnectionSpeed: vi.fn(),
}))

describe('accessoryEngine', () => {
  const accessories = [
    {
      items: [
        {
          id: 'A',
          validations: {
            notCompatibleAccessoryIds: ['B'],
            mutualExclusionAccessoryIds: ['C'],
            autoSelectedAccessoryIds: ['D'],
            childAccessoryIds: ['E'],
          },
        },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
      ],
    },
  ]

  it('should return previous state if item is not found', () => {
    const prevState = {
      selectedIds: ['A'],
      disabledIds: [],
    }

    const result = accessoryEngine(accessories, prevState, 'NOT_EXISTING')

    expect(result).toBe(prevState)
  })

  it('should select an accessory if not already selected', () => {
    const prevState = {
      selectedIds: [],
      disabledIds: [],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).toEqual(['A', 'D'])
    expect(result.disabledIds).toEqual(['B'])
  })

  it('should remove incompatible accessories from selected and disable them', () => {
    const prevState = {
      selectedIds: ['B'],
      disabledIds: [],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).toEqual(['A', 'D'])
    expect(result.disabledIds).toEqual(['B'])
  })

  it('should remove mutually exclusive accessories from selected', () => {
    const prevState = {
      selectedIds: ['C'],
      disabledIds: [],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).toEqual(['A', 'D'])
    expect(result.disabledIds).toEqual(['B'])
  })

  it('should auto-select accessories defined in autoSelectedAccessoryIds', () => {
    const prevState = {
      selectedIds: [],
      disabledIds: [],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).toContain('D')
  })

  it('should enable child accessories when selecting parent', () => {
    const prevState = {
      selectedIds: [],
      disabledIds: ['E'],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.disabledIds).not.toContain('E')
  })

  it('should deselect an accessory if already selected', () => {
    const prevState = {
      selectedIds: ['A'],
      disabledIds: ['B'],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).toEqual([])
    expect(result.disabledIds).toEqual(['E'])
  })

  it('should auto-select an item but NOT trigger the auto-selected item validations (no recursion)', () => {
    const recursiveAccessories = _.cloneDeep(accessories)

    const itemD = recursiveAccessories[0].items.find((i) => i.id === 'D')

    if (itemD) {
      itemD.validations = {
        notCompatibleAccessoryIds: ['E'],
        mutualExclusionAccessoryIds: [],
        autoSelectedAccessoryIds: [],
        childAccessoryIds: [],
      }
    }

    const prevState = {
      selectedIds: ['E'],
      disabledIds: [],
    }

    const result = accessoryEngine(recursiveAccessories, prevState, 'A')

    expect(result.selectedIds).toContain('D')

    expect(result.selectedIds).toContain('E')
  })

  it('should prioritize auto-selection over incompatibility if configured incorrectly', () => {
    const conflictedAccessories = _.cloneDeep(accessories)
    const itemA = conflictedAccessories[0].items.find((i) => i.id === 'A')
    itemA.validations.notCompatibleAccessoryIds = ['B']
    itemA.validations.autoSelectedAccessoryIds = ['B']

    const prevState = { selectedIds: [], disabledIds: [] }
    const result = accessoryEngine(conflictedAccessories, prevState, 'A')

    expect(result.selectedIds).toContain('B')
  })

  it('should revert side effects when deselecting the parent', () => {
    const prevState = {
      selectedIds: ['A', 'D'],
      disabledIds: ['B'],
    }

    const result = accessoryEngine(accessories, prevState, 'A')

    expect(result.selectedIds).not.toContain('A')
    expect(result.selectedIds).not.toContain('D')
    expect(result.disabledIds).not.toContain('B')
    expect(result.disabledIds).toContain('E')
  })

  it('should keep child enabled if another selected parent still enables it', () => {
    const sharedChildAccessories = [
      {
        items: [
          {
            id: 'A',
            validations: {
              childAccessoryIds: ['E'],
            },
          },
          {
            id: 'X',
            validations: {
              childAccessoryIds: ['E'],
            },
          },
          { id: 'E' },
        ],
      },
    ]

    const prevState = {
      selectedIds: ['A', 'X'],
      disabledIds: [],
    }

    const result = accessoryEngine(sharedChildAccessories, prevState, 'A')

    expect(result.selectedIds).toEqual(['X'])
    expect(result.disabledIds).not.toContain('E')
  })

  it('should keep auto-selected accessory if another selected parent still auto-selects it', () => {
    const sharedAutoAccessories = [
      {
        items: [
          {
            id: 'A',
            validations: {
              autoSelectedAccessoryIds: ['D'],
            },
          },
          {
            id: 'X',
            validations: {
              autoSelectedAccessoryIds: ['D'],
            },
          },
          { id: 'D' },
        ],
      },
    ]

    const prevState = {
      selectedIds: ['A', 'X', 'D'],
      disabledIds: [],
    }

    const result = accessoryEngine(sharedAutoAccessories, prevState, 'A')

    expect(result.selectedIds).toContain('X')
    expect(result.selectedIds).toContain('D')
  })

  it('should re-enable incompatible accessory only when no selected parent keeps incompatibility', () => {
    const sharedIncompatibleAccessories = [
      {
        items: [
          {
            id: 'A',
            validations: {
              notCompatibleAccessoryIds: ['B'],
            },
          },
          {
            id: 'X',
            validations: {
              notCompatibleAccessoryIds: ['B'],
            },
          },
          { id: 'B' },
        ],
      },
    ]

    const prevState = {
      selectedIds: ['A', 'X'],
      disabledIds: ['B'],
    }

    const afterFirstDeselect = accessoryEngine(
      sharedIncompatibleAccessories,
      prevState,
      'A',
    )

    expect(afterFirstDeselect.disabledIds).toContain('B')

    const afterSecondDeselect = accessoryEngine(
      sharedIncompatibleAccessories,
      afterFirstDeselect,
      'X',
    )

    expect(afterSecondDeselect.disabledIds).not.toContain('B')
  })

  it('should handle missing or null validation arrays gracefully', () => {
    const dirtyAccessories = [
      {
        items: [
          {
            id: 'Z',
            validations: {
              notCompatibleAccessoryIds: null,
            },
          },
        ],
      },
    ]

    const prevState = { selectedIds: [], disabledIds: [] }

    const result = () => accessoryEngine(dirtyAccessories, prevState, 'Z')

    expect(result).not.toThrow()
  })
})

describe('calculateConnectionSpeed', () => {
  beforeEach(() => {
    vi.mocked(APISelections.updateConnectionSpeed).mockReset()
  })

  it('should merge connection accessories returned by updateConnectionSpeed', async () => {
    const accessories = [
      {
        id: 'group',
        items: [
          {
            id: 'A',
            price: 10,
            validations: {
              isSelected: false,
              customValidation: true,
            },
          },
          {
            id: 'B',
            validations: {
              isSelected: true,
            },
          },
        ],
      },
    ]

    const setFieldValue = vi.fn()

    vi.mocked(APISelections.updateConnectionSpeed).mockResolvedValue({
      data: {
        inlet_connection_velocity: 1,
        outlet_connection_velocity: 2,
        inner_volume: 3,
        connectionAccessories: [
          {
            items: [
              {
                id: 'A',
                price: 12,
                validations: {
                  isSelected: true,
                  isDisabled: false,
                },
              },
            ],
          },
        ],
      },
      headers: {} as any,
    })

    await calculateConnectionSpeed(
      {
        id: 'selection-id',
        general_info: { inlet_connection_number: 1 },
        accessories,
      },
      setFieldValue,
    )

    expect(APISelections.updateConnectionSpeed).toHaveBeenCalledWith(
      'selection-id',
      { inlet_connection_number: 1 },
    )
    expect(setFieldValue).toHaveBeenCalledWith(
      'detail_data.general_info.inlet_connection_velocity.value',
      1,
    )
    expect(setFieldValue).toHaveBeenCalledWith(
      'detail_data.general_info.outlet_connection_velocity.value',
      2,
    )
    expect(setFieldValue).toHaveBeenCalledWith(
      'detail_data.general_info.inner_volume.value',
      3,
    )
    expect(setFieldValue).toHaveBeenCalledWith(
      'detail_data.accessories',
      [
        {
          id: 'group',
          items: [
            {
              id: 'A',
              price: 12,
              validations: {
                isSelected: true,
                customValidation: true,
                isDisabled: false,
              },
            },
            {
              id: 'B',
              validations: {
                isSelected: true,
              },
            },
          ],
        },
      ],
      false,
    )
  })
})

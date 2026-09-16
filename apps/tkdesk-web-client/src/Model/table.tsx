import * as F from 'Model/functions'
import * as R from 'ramda'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Table')

// MARSHALING
// FROM the server
// TO the server
/**
 * Marshal of params object
 * @param {Object} params
 * @param {Object} params.filters
 * @param {Object} params.orders
 * @param {Object} params.pagination
 * @param {Object} params.query
 */
export function marshalParamsTo(params: any): any {
  const newParams = R.pipe(
    R.over<any, any>(
      R.lensProp('filters'),
      R.pipe(marshalFilterTo, R.when<any, any>(R.isEmpty, R.always(undefined))),
    ),
    R.over(
      R.lensProp('orders'),
      R.pipe(marshalOrderTo, R.when<any, any>(R.isEmpty, R.always(undefined))),
    ),
    R.over(R.lensProp('pagination'), marshalPaginationTo),
    R.over(
      R.lensProp('query'),
      R.when(R.pipe(R.defaultTo(''), R.trim, R.isEmpty), R.always(undefined)),
    ),
    R.over<any, any>(R.lensProp('ranges'), marshalRangesTo),
  )(params)
  log.info('marshalParamsTo', { params, newParams })
  return newParams
}

export function marshalFilterTo(tableFilter = {}) {
  log.info('marshalFilterTo.pre', tableFilter)

  const newFilters = R.pipe(
    R.toPairs,
    R.reduce<any, any>((acc, [key, value]) => {
      const newValue: any =
        key === 'product_family' || key === 'invoice'
          ? R.map((el: any) => el.code)(value)
          : value
      return R.either(R.isNil, R.isEmpty)(newValue)
        ? acc
        : [
            ...acc,
            {
              field: key,
              values: newValue,
            },
          ]
    }, []),
  )(tableFilter)
  log.info('marshalFilterTo.post', newFilters)
  return newFilters
}

export function marshalOrderTo(orders: any = {}) {
  log.info('marshalParamsTo', { orders })
  const ordMap = {
    ascend: 'asc',
    descend: 'desc',
  }

  let newOrders: any[] = []

  if (!R.isNil(orders) && !R.isEmpty(orders)) {
    const { order, field }: { order: 'ascend' | 'descend'; field: any } = orders

    if (!(R.isNil(order) || R.isNil(field))) {
      newOrders = [{ value: ordMap[order], field }]
    }
  }

  return newOrders
}

export function marshalPaginationTo(pagination: any = {}) {
  const pager = {
    current: pagination.current ?? 1,
    pageSize: pagination.pageSize,
  }
  return pager
  // const {current, pageSize } = pagination
  // return { per_page: pageSize, page: current }
}

export const marshalRangesTo = R.pipe(
  R.toPairs,
  R.reject(([key, datas]) => {
    return R.either(R.isNil, R.isEmpty)(datas)
  }),
  R.map(([key, datas]: any) => ({
    field: key,
    ...datas,
  })),
)

export function marshalPaginationFrom(request: any) {
  const { headers } = request
  const { total, 'per-page': pageSize } = headers

  return { total: Number(total), pageSize: Number(pageSize) }
}

// FILTERS AND PARAMS
/**
 * Create a filter, from a key and filtering values, and an optional filter.
 * If the filter is passes, the new filter will merge the old filter with the
 * new filter
 * @param {String} key
 * @param {[Strings]} values
 * @param {Filter} filters
 * @sign (String, [String], Filter) -> Filter
 */
export function createFilter(key: string, values: string[], filters = {}) {
  return {
    ...filters,
    [key]: values,
  }
}

/**
 * Add a set of filters to a set of table columns
 * @param {Filters} filters
 * @param {Columns} columns
 * @sign Filters -> Columns -> Columns
 * @example
 * const newCols = applyFiltersToColumns({
 *    status : ['active', 'acceptance'],
 *    type: ['area_manager', 'collaborator']
 * })(T.defaultColumns)
 */
export const applyFiltersToColumns = R.curry((filters, columns) => {
  if (R.isNil(filters) || R.isEmpty(filters) || !R.is(Object, filters)) {
    return columns
  }

  const newColumns = R.map((col) => {
    if (!R.isNil(col.children)) {
      const childCols = col.children

      // mapping che mother Col with childrens
      return {
        ...col,
        children: R.map((childCol: any) => {
          const filter = filters[childCol.dataIndex]
          if (!R.isNil(filter)) {
            return { ...childCol, filteredValue: filter }
          } else {
            return childCol
          }
        })(childCols),
      }
    } else {
      const filter = filters[col.dataIndex]
      if (!R.isNil(filter)) {
        return { ...col, filteredValue: filter }
      }
    }

    const filter = filters[col.dataIndex]
    if (!R.isNil(filter)) {
      return { ...col, filteredValue: filter }
    }
    return { ...col, filteredValue: null }
  }, columns)

  return newColumns
})

/**
* Add a set of filters to a set of table columns
* @param {Array} status
* @return {Column} column
* @example
* const tableColumns = R.pipe(
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
    removeKeysFromFilters(['to_complete', 'completed'])
  )(searchColumns)
*/
export const removeKeysFromFilters = R.curry<any>(
  (nameKey: any, statusArray: any[]) => {
    return R.map<any, any[]>((column) => {
      const isStatusColumn = R.propEq('dataIndex', nameKey, column)
      if (isStatusColumn) {
        return R.over(
          R.lensProp<any, any>('filters'),
          R.reject((filter: any) => R.includes(filter.value, statusArray)),
        )(column)
      } else {
        return column
      }
    })
  },
)

/**
 * Add a set of orders to a set of table columns
 * @param {Orders} orders
 * @param {Columns} columns
 * @sign Orders -> Columns -> Columns
 */
export const applyOrdersToColumns = R.curry((orders, columns) => {
  if (R.isNil(orders) || R.isEmpty(orders) || !R.is(Object, orders)) {
    return R.map((col) => {
      if (col.sorter) {
        return { ...col, sortOrder: false }
      }
      return col
    }, columns)
  }

  return R.map((col) => {
    if (col.dataIndex === orders.field) {
      return { ...col, sortOrder: orders.order }
    }
    return { ...col, sortOrder: false }
  }, columns)
})

export function removeFiltersToColumns(columns: any[]) {
  return R.map((column) => {
    const { filters, ...other } = column
    return other
  }, columns)
}

export function removeOrdersToColumns(columns: any[]) {
  return R.map((column) => {
    const {
      orders,
      defaultSortOrder,
      sortOrder,
      sortDirections,
      sorter,
      ...other
    } = column
    return other
  }, columns)
}

const defInitState = {
  query: '',
  filters: {},
  orders: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
}

/**
 * Create empty params or merge default params with passed params
 * @param {Params=} params
 */
export function createParams(params = {}) {
  const newParams = R.mergeDeepWith(F.mergeRightNil, defInitState, params)
  return newParams
}

/**
 * add filters to a params object
 * @example
 * const newParam = addFiltersToParams({
 *    status : ['active', 'acceptance'],
 *    type: ['area_manager', 'collaborator']
 * })(param)
 */
export const addFiltersToParams = R.curry((filters: any, params: any) => {
  return R.pipe(
    R.mergeDeepRight({
      filters: {},
    }),
    R.over<any, any>(
      R.lensProp('filters'),
      R.mergeDeepWith<any, any>(
        (f1: any, f2: any) => R.uniq<any>(R.concat(f1, f2) as any),
        filters,
      ),
    ),
  )(params)
})

/**
 * Apply default filter params, before
 * To be used before the T.marshalParamsTo
 * @param {Params} params - initial search params
 * @param {String} filterKey - the filter key
 * @param {[String]} filterValues - an array of values
 * @example
 * const newParams = F.defaultFilterParams(
 *  params,
 *  'status',
 *  ['active', 'to_complete']
 * )
 */
export function defaultFilterParams(
  params: any,
  filterKey: any,
  filterValues: any,
) {
  if (!R.isEmpty(R.pathOr([], ['filters', filterKey], params))) {
    return params
  } else {
    const newParams = R.assocPath(['filters', filterKey], filterValues, params)
    return newParams
  }
}

/**
 * Removing list of Table columns
 * @param {Columns} [columns]
 * @example
 * R.pipe(
 *  removeColumns(['status'])
 * )(staticColumns)
 *
 */
export const removeColumns = R.curry((remCol, columns) => {
  return R.reject((col) => {
    if (R.has('key', col)) {
      return R.includes(col.key, remCol)
    } else {
      return R.has('dataIndex', col) ? R.includes(col.dataIndex, remCol) : false
    }
  })(columns)
})

/**
 * Used to apply month/quarter/year filter to Table Columns
 * @example
 * 
 * {
      title: 'Mese',
      dataIndex: 'month',
      key: 'month',
      filters: T.monthFilters,
    },
 *
 */
// export const monthFilters = R.map(
//   (month) => ({
//     text: <DisplayIntl value={month} prefix="static.general.month." />,
//     value: month,
//   }),
//   Object.keys(C.month)
// )

// export const quarterFilters = R.map(
//   (quarter) => ({
//     text: <DisplayIntl value={quarter} prefix="static.general.quarter." />,
//     value: quarter,
//   }),
//   Object.keys(C.quarter)
// )

// export const yearFilters = R.map(
//   (year) => ({
//     text: <Display value={year} />,
//     value: year,
//   }),
//   Object.keys(C.year())
// )

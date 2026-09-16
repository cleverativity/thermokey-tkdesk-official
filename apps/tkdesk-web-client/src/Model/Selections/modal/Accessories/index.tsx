import { FileSearchOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import {
  FieldCheckBoxGroup,
  FieldDecimalNumber,
  FieldInput,
} from 'Components/Field'
import { StyledSpinner } from 'Components/Styled'
import { useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import SubmitModal from 'Components/Modal/SubmitModal'
import { useFormikContext } from 'formik'

interface AccessoriesProps {
  onCancel: () => void
  modal: {
    visible: boolean
    loading: boolean

    progress: boolean
    error: boolean
  }
  data?: {
    accessories: any
    accessoriesPrice?: any
    condensers?: any
  }
  // onLoadAccessoriesPrice?: (payload: any) => void
  setSelectedAccessoryIds?: any
  setDiscount?: any
  discount?: any
}

function AccessoriesPriceModal(props: AccessoriesProps) {
  const log = new ConsoleLogger('Model/Selections/modal/AccessoriesPriceModal')
  const {
    onCancel,
    modal,
    data,
    setSelectedAccessoryIds,
    setDiscount,
    discount,
  } = props
  const { accessories, accessoriesPrice, condensers } = data

  // log.info('AccessoriesPriceModal', data)

  const formik = useFormikContext()
  const { values, setFieldValue, setValues } = formik
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAccessories, setSelectedAccessories] = useState({
    EA: [],
    MA: [],
  })
  const [combinedAccessories, setCombinedAccessories] = useState([])

  const onHandleInput = (e: any, name: string) => {
    const value = e.target.value
    log.info('onHandleInput.e:', name)

    setDiscount({
      ...discount,
      [name === 'accessories.accessoriesDiscount'
        ? 'accDiscount'
        : 'unitDiscount']: value,
    })
  }

  const onHandleAccessoriesChange = (checkedValues: any, type: string) => {
    // // Update the selected accessories state
    const updatedAccessories = {
      ...selectedAccessories,
      [type]: checkedValues,
    }
    setSelectedAccessories(updatedAccessories)
    // Combine both EA and MA into a single flat array
    const combinedArray = [...updatedAccessories.EA, ...updatedAccessories.MA]
    setCombinedAccessories(combinedArray)

    //load selected accessories
    setSelectedAccessoryIds(combinedArray)
  }

  const handleOnCancel = () => {
    onCancel()
    setCombinedAccessories([])
  }

  const onSubmit = (values: { [key: string]: any }, frk: any) => {
    onCancel()
  }
  log.info(
    'AccessoriesPriceModal',
    values,
    formik,
    combinedAccessories,
    accessoriesPrice,
  )

  return (
    <>
      <SubmitModal
        key={`accessories-${modal.visible}-${condensers?.modelId || 'new'}`}
        modal={{
          ...modal,
          data: {
            ...data,
            accessoriesPrice: {
              ...(accessoriesPrice || {}),
            },
            // Preserve checkbox selections so Formik reinitialize (when data ref changes) doesn't wipe them
            accessories: {
              ...(data?.accessories || {}),
              electrical_accessories: selectedAccessories.EA,
              mechanical_accessories: selectedAccessories.MA,
            },
          },
        }}
        onSubmit={onSubmit}
        onCancel={handleOnCancel}
        width={1100}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <StyledSpinner />
          </div>
        ) : data?.condensers != null ? (
          <>
            <Row gutter={16}>
              <Col span={6}>
                <div style={{ paddingTop: 12 }}>
                  <FieldCheckBoxGroup
                    span={{ sm: 24, lg: 24, xl: 24 }}
                    name='accessories.electrical_accessories'
                    label='data.thermal.field.electrical_accessories'
                    options={accessories?.EA || []}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                    className='red-label'
                    onChange={(checkedValues) =>
                      onHandleAccessoriesChange(checkedValues, 'EA')
                    }
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ paddingTop: 12 }}>
                  <FieldCheckBoxGroup
                    span={{ sm: 24, lg: 24, xl: 24 }}
                    name='accessories.mechanical_accessories'
                    label='data.thermal.field.mechanical_accessories'
                    options={accessories?.MA || []}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                    className='blue-label'
                    onChange={(checkedValues) =>
                      onHandleAccessoriesChange(checkedValues, 'MA')
                    }
                  />
                </div>
              </Col>
            </Row>

            <Row justify='end' align='middle' style={{ marginRight: 2 }}>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Row gutter={[16, 16]}>
                  <FieldInput
                    span={{ sm: 24, md: 12, lg: 24 }}
                    name='accessoriesPrice.remoteModel'
                    scale={1}
                    label='data.thermal.new_condenser_name'
                    required
                    controls={true}
                    disabled
                    isPointed={true}
                  />
                </Row>
                <Row gutter={[16, 16]}>
                  <FieldDecimalNumber
                    span={{ sm: 24, md: 12, lg: 12 }}
                    name='accessoriesPrice.accessoriesPrice'
                    scale={1}
                    label='data.thermal.accessories.accessoriesPrice'
                    required
                    controls={true}
                    disabled
                    isPointed={true}
                  />
                  <FieldDecimalNumber
                    span={{ sm: 24, md: 12, lg: 12 }}
                    name='accessoriesPrice.unitPrice'
                    scale={1}
                    label='data.thermal.accessories.accessoriesUnitPrice'
                    required
                    controls={true}
                    disabled
                    isPointed={true}
                  />
                </Row>
                <Row gutter={[16, 16]}>
                  <FieldDecimalNumber
                    span={{ sm: 24, md: 12, lg: 12 }}
                    name='accessoriesPrice.accessoriesDiscount'
                    scale={1}
                    label='data.thermal.accessories.accessoriesDiscount'
                    required
                    controls={true}
                    onChange={(e) =>
                      onHandleInput(e, 'accessories.accessoriesDiscount')
                    }
                    isPointed={true}
                  />
                  <FieldDecimalNumber
                    span={{ sm: 24, md: 12, lg: 12 }}
                    name='accessoriesPrice.unitDiscount'
                    scale={1}
                    label='data.thermal.accessories.accessoriesUnitDiscount'
                    required
                    controls={true}
                    onChange={(e) =>
                      onHandleInput(e, 'accessories.accessoriesUnitDiscount')
                    }
                    isPointed={true}
                  />
                </Row>
                <Row gutter={[16, 16]}>
                  <FieldDecimalNumber
                    span={{ sm: 24, md: 12, lg: 24 }}
                    name='accessoriesPrice.totalNetPrice'
                    scale={1}
                    label='data.thermal.accessories.accessoriesTotal'
                    required
                    controls={true}
                    disabled
                    isPointed={true}
                  />
                </Row>
              </div>
            </Row>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ marginBottom: '12px' }}>
              <FileSearchOutlined
                style={{ fontSize: '48px', color: '#D4D4D8' }}
              />
            </div>
            <div style={{ color: '#D4D4D8' }}>
              No accessories accessories available.
            </div>
          </div>
        )}
      </SubmitModal>
    </>
  )
}

export default AccessoriesPriceModal

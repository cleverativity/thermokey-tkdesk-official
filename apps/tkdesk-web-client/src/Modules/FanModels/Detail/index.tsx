import { Col, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'

import { useModal } from 'Generic/hooks'

import {
  StyledButton,
  StyledCard,
  StyledDescriptions,
  StyledPageHeader,
} from 'Components/Styled'
import { FormikForm } from 'Components/Formik'
import { Detail, DetailIntl, DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

import ConfirmDeleteFanModel from 'Model/FanModels/modal/ConfirmDeleteFanModel'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAuthorization } from 'Modules/App/Authorization'

import FanModel from './FanModel'

const log = new ConsoleLogger('Modules/FanModels/Detail')

const FanModelDetail = (props: any) => {
  log.info('render.props', props)
  const {
    data: fan_model,
    onBack,
    onEdit,
    onDelete,
    onPolynomialSearch,
  } = props

  const autho = useAuthorization()

  const items = [
    {
      label: <SpanIntl value='data.fan_models.code' />,
      children: <Detail name='internal_code' />,
    },
    {
      label: <SpanIntl value='ui.generic.model_code' />,
      children: <Detail name='model_code' />,
    },
    {
      label: <SpanIntl value='data.fan_models.print_code' />,
      children: <Detail name='print_code' />,
    },
    {
      label: <SpanIntl value='data.fan_models.cst_model_name' />,
      children: <Detail name='cst_model_name' />,
    },

    {
      label: <SpanIntl value='data.fan_models.article_no' />,
      children: <Detail name='article_no' />,
    },
    {
      label: <SpanIntl value='data.fan_models.weight' />,
      children: <DetailNumber name='weight' />,
    },
    {
      label: <SpanIntl value='data.fan_models.price' />,
      children: <DetailNumber name='price' />,
    },

    {
      label: <SpanIntl value='data.fan_models.visibility' />,
      children: (
        <DetailIntl prefix='select.fan_models.visibility.' name='visibility' />
      ),
    },
  ]

  const handleOnEdit = () => {
    const { id } = fan_model
    onEdit(id)
  }

  const handleOnPolynomialSearch = () => {
    const { id } = fan_model
    onPolynomialSearch(id)
  }

  const {
    modal: modalConfirmDelete,
    handleOpenModal: handleOpenModalConfirmDelete,
    handleCloseModal: handleCloseModalConfirmDelete,
  } = useModal({ fan_model })

  return (
    <>
      <StyledPageHeader title='data.fan_models.detail_header' />
      <FormikForm initialValues={fan_model}>
        <Row
          justify='space-between'
          align='middle'
          style={{ marginBottom: '20px' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={onBack}
              id='button.detail.goback'
            />
          </Col>
          <Col>
            {autho.check(rawPermissions.Polynomial.manage) ? (
              <StyledButton
                label='data.fan_models.fan_curve'
                onClick={handleOnPolynomialSearch}
                id='button.fan_models.fan_curve'
                style={{ marginRight: '20px' }}
              />
            ) : null}
            {autho.check(rawPermissions.FanModel.destroy) ? (
              <StyledButton
                label='data.fan_models.delete'
                onClick={() =>
                  handleOpenModalConfirmDelete({ fan_modal: fan_model })
                }
                danger
                id='button.fan_models.delete'
                style={{ marginRight: '20px' }}
              />
            ) : null}

            <StyledButton
              label='data.generic.edit'
              onClick={handleOnEdit}
              type='primary'
              id='button.fan_models.edit'
            />
          </Col>
        </Row>

        <StyledCard>
          <StyledDescriptions items={items} />
        </StyledCard>

        <StyledCard>
          <FanModel data={fan_model} />
        </StyledCard>

        <ConfirmDeleteFanModel
          onDelete={onDelete}
          onCancel={handleCloseModalConfirmDelete}
          modal={{
            ...modalConfirmDelete,
            visible: modalConfirmDelete.visible,
            loading: false,
            progress: false,
            error: false,
          }}
        />
      </FormikForm>
    </>
  )
}

export default FanModelDetail

import _ from 'lodash'
import { Dropdown, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import TypeButton from 'Components/Generic/TypeButton'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Generic/Buttons/Actions')

const ActionsButton = (props: any) => {
  const {
    defaultAction,
    actions,
    label,
    className,
    ids,
    type,
    href,
    target,
    ...other
  } = props

  if (_.isNil(actions) || _.isEmpty(actions)) {
    return null
  }

  let mapActions = _.reject(actions, (singleAction) =>
    _.get(singleAction, 'isExternalLink', false),
  )

  const externalLinkActions = _.reject(actions, (singleAction) => {
    const isExternalLink = _.get(singleAction, 'isExternalLink', null)
    return _.isNil(isExternalLink)
  })

  if (actions.length === 1) {
    const [action] = actions
    const {
      label: buttonLabel,
      action: actionFunction,
      props: actionProps = {},
    } = action
    return (
      <TypeButton
        {...other}
        {...actionProps}
        {...ids}
        {...type}
        {...href}
        {...target}
        onClick={actionFunction}
      >
        <span {..._.get(action, 'ids', {})}>{buttonLabel}</span>
      </TypeButton>
    )
  }

  let theDefaultAction = null

  if (defaultAction) {
    const [first, ...tail] = mapActions
    mapActions = tail
    theDefaultAction = first
  }

  const handleMenuClick = (e: any) => {
    log.info('click', { e, mapActions })
    const onAction: any = _.get(mapActions, [Number(e.key), 'action'], null)

    if (!_.isNil(onAction)) {
      onAction()
    } else {
      log.error('Unknown action', e)
    }
  }

  const externalLinkButtons = !_.isEmpty(externalLinkActions)
    ? _.map(externalLinkActions, (single: any) => (
        <Button style={{ marginBottom: 5 }} {...single.props}>
          {single.label}
        </Button>
      ))
    : null

  const otherButtons = _.map(mapActions, (action: any, idx: any) => {
    return {
      label: <span {..._.get(action, 'ids', {})}>{action.label}</span>,
      key: idx,
    }
  })

  if (theDefaultAction) {
    return (
      <>
        {externalLinkButtons}

        <Dropdown.Button
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={
            !_.isNil(theDefaultAction.action)
              ? theDefaultAction.action
              : undefined
          }
          menu={{ items: otherButtons, onClick: handleMenuClick }}
          icon={<MoreOutlined />}
          {...other}
          {...ids}
        >
          <span {..._.get(theDefaultAction, 'ids', {})}>
            {theDefaultAction.label}
          </span>
        </Dropdown.Button>
      </>
    )
  } else {
    return (
      <>
        {externalLinkButtons}
        <Dropdown.Button
          onClick={undefined}
          menu={{ items: otherButtons, onClick: handleMenuClick }}
          {...other}
          {...ids}
        >
          {label}
        </Dropdown.Button>
      </>
    )
  }
}

ActionsButton.defaulProps = {
  defaultAction: false,
  label: 'empty',
  ids: {},
  visible: true,
}

export default ActionsButton

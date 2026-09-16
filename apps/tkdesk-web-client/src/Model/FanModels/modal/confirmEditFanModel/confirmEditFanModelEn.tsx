import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Do you really want to edit the fan model?',
    content: 'By clicking on Confirm, you will confirm the changes.',
    okText: 'Confirm',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Cancel',
    onCancel() {},
    okButtonProps: { id: 'button.cleander_routing.confirm' },
    cancelButtonProps: { id: 'button.cleander_routing.cancel' },
  })
}

import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Do you really want to go back to the first step?',
    content:
      'By clicking on Confirm, you will lose the data entered up to this moment.',
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

import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Order creation',
    content:
      'By clicking on Confirm, the order will be generated and taken over by our team. \n You will be contacted.',
    okText: 'Confirm',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Cancel',
    onCancel() {},
    okButtonProps: { id: 'button.order_creation.confirm' },
    cancelButtonProps: { id: 'button.order_creation.cancel' },
  })
}

import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Complete calcultion',
    content:
      'By clicking on Confirm, the calculation will be completed and will no longer be editable.',
    okText: 'Confirm',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Cancel',
    onCancel() {},
    okButtonProps: { id: 'button.complete_calculation.confirm' },
    cancelButtonProps: { id: 'button.complete_calculation.cancel' },
  })
}

import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Do you really want to edit global Corrective Factors?',
    content: 'By clicking on Confirm, you will confirm the changes.',
    okText: 'Confirm',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Cancel',
    onCancel() {},
    okButtonProps: { id: 'button.corrective_factor.edit.confirm' },
    cancelButtonProps: { id: 'button.corrective_factor.edit.cancel' },
  })
}

import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Confirm resending login credentials',
    content:
      'By clicking on Confirm, the login credentials will be sent to the user by email.',
    okText: 'Confirm',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Cancel',
    onCancel() {},
    okButtonProps: { id: 'button.resend_signup.confirm' },
    cancelButtonProps: { id: 'button.resend_signup.cancel' },
  })
}

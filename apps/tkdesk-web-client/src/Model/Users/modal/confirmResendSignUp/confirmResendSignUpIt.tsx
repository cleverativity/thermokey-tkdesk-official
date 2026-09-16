import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Conferma reinvio credenziali di accesso',
    content:
      "Cliccando su Conferma, verranno reinviate per email le credenziali di accesso all'utente.",
    okText: 'Conferma',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Annulla',
    onCancel() {},
    okButtonProps: { id: 'button.resend_signup.confirm' },
    cancelButtonProps: { id: 'button.resend_signup.cancel' },
  })
}

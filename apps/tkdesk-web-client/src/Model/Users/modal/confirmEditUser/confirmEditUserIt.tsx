import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: "Vuoi davvero modificare l'utente?",
    content: 'Cliccando su Conferma, confermerai la modifica.',
    okText: 'Conferma',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Annulla',
    onCancel() {},
    okButtonProps: { id: 'button.cleander_routing.confirm' },
    cancelButtonProps: { id: 'button.cleander_routing.cancel' },
  })
}

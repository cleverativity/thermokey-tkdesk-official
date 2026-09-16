import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Vuoi davvero tornare al primo step?',
    content:
      'Cliccando su Conferma, perderai i dati inseriti fino a questo momento.',
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

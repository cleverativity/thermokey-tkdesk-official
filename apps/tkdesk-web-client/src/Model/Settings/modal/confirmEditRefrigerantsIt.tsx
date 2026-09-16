import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Vuoi davvero modificare i Refrigeranti globali?',
    content: 'Cliccando su Conferma, confermerai la modifica.',
    okText: 'Conferma',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Annulla',
    onCancel() {},
    okButtonProps: { id: 'button.corrective_factor.edit.confirm' },
    cancelButtonProps: { id: 'button.corrective_factor.edit.cancel' },
  })
}

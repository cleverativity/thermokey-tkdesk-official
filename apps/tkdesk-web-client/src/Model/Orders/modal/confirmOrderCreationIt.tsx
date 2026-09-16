import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Creazione ordine',
    content:
      "Cliccando su Conferma,l'ordine verrà generato e preso in carico dal nostro team. \n Verrai ricontattato.",
    okText: 'Conferma',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Annulla',
    onCancel() {},
    okButtonProps: { id: 'button.order_creation.confirm' },
    cancelButtonProps: { id: 'button.order_creation.cancel' },
  })
}

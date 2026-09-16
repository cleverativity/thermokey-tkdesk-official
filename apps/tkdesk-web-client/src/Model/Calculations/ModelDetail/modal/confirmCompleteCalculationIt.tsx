import { Modal } from 'antd'

export default (action: any) => () => {
  Modal.confirm({
    title: 'Completa calcolo',
    content:
      'Cliccando su Conferma, il calcolo verrà completato e non sarà più modificabile.',
    okText: 'Conferma',
    onOk() {
      action()
      return new Promise((resolve) => setTimeout(resolve, 100))
    },
    cancelText: 'Annulla',
    onCancel() {},
    okButtonProps: { id: 'button.complete_calculation.confirm' },
    cancelButtonProps: { id: 'button.complete_calculation.cancel' },
  })
}

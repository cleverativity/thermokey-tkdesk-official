import { useState } from 'react'
import * as R from 'ramda'

const useModal = (dataInit?: any) => {
  const [modal, setModal] = useState({
    visible: false,
    error: false,
    loading: false,
    isNew: true,
    data: {
      __formik_state_reset: false,
      ...dataInit,
    },
  })

  const handleOpenModal = (
    values: any,
    mode?: 'create' | 'edit' | null,
    custom_modal_data?: any
  ) => {
    setModal({
      ...modal,
      visible: true,
      isNew: R.isNil(mode) || mode === 'create',
      data: {
        __formik_state_reset: true,
        ...(values ?? {}),
      },
      ...custom_modal_data,
    })
  }

  const handleCloseModal = () => {
    setModal({
      ...modal,
      visible: false,
      data: {
        __formik_state_reset: false,
      },
    })
  }

  return { modal, handleOpenModal, handleCloseModal }
}

export default useModal

import {toast} from 'react-toastify'

export const notifyDelete = () => {
  toast.error('You deleted item !!!', {
    position: 'top-left',
    autoClose: 1500,
  })
}
export const notifyAllDelete = () => {
  toast.error('You Deleted All Item !!!', {
    position: 'top-left',
    autoClose: 2300,
  })
}

export const notifySuccess = () => {
  toast.success('Thank you for your choice !!!', {
    position: 'top-right',
    autoClose: 1500,
  })
}

export const notifyIsActive = () => {
  toast.warn(
    'There has been no activity on the page for 30 seconds. You will be logged out within 15 seconds.',
    {
      autoClose: false,
      position: 'top-center',
    }
  )
}

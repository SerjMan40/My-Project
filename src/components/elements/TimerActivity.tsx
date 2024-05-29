import {toast} from 'react-toastify'
import {useIdleTimer} from 'react-idle-timer'
import {useDispatch, useSelector} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import {RootState} from '../../redux/store'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

import {notifyIsActive} from '../../utils/notify'
import {isLogOut} from '../../redux/slices/itemsSlices'

const TimerActivity: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector((state: RootState) => state.items.isLogin)

  const handleOnIdleNotify = () => {
    notifyIsActive()
  }

  const handleOnIdleLogout = () => {
    dispatch(isLogOut())
    toast.dismiss()
    navigate('/')
  }

  const handleOnActive = () => {
    toast.dismiss()
  }

  const {
    start: startNotifyTimer,
    reset: resetNotifyTimer,
    pause: pauseNotifyTimer,
  } = useIdleTimer({
    timeout: 30000,
    onIdle: handleOnIdleNotify,
    onActive: handleOnActive,
    debounce: 500,
    startOnMount: false,
  })

  const {
    start: startLogoutTimer,
    reset: resetLogoutTimer,
    pause: pauseLogoutTimer,
  } = useIdleTimer({
    timeout: 45000,
    onIdle: handleOnIdleLogout,
    onActive: handleOnActive,
    debounce: 500,
    startOnMount: false,
  })

  useEffect(() => {
    if (isLogin) {
      startLogoutTimer()
      startNotifyTimer()
    } else {
      pauseLogoutTimer()
      pauseNotifyTimer()
    }
    return () => {
      resetNotifyTimer()
      resetLogoutTimer()
    }
  }, [
    isLogin,
    resetNotifyTimer,
    resetLogoutTimer,
    startLogoutTimer,
    startNotifyTimer,
    pauseLogoutTimer,
    pauseNotifyTimer,
  ])

  return null
}

export default TimerActivity

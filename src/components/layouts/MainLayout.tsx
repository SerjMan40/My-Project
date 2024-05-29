import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {ToastContainer} from 'react-toastify'

import Menu from '../elements/Menu'
import TimerActivity from '../elements/TimerActivity'

const MainLayout = () => {
  const islogin = useSelector((state: RootState) => state.items.isLogin)

  return (
    <div className="mainLayout-container">
      {islogin && <Menu />}
      <TimerActivity />
      <ToastContainer />
      <Outlet />
    </div>
  )
}

export default MainLayout

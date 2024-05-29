import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {useNavigate} from 'react-router-dom'

import './NotFound.css'
import Footer from '../elements/Footer'
import { useEffect } from 'react'

const NotFound = () => {

  const isLogin = useSelector((state: RootState) => state.items.isLogin)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])
  return (
    <div className="img-background__blur">
      <div className="class-container">
        <main className="notFound-container">
          <h1>Not Found</h1>
        </main>
        <footer className="class-footer">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default NotFound

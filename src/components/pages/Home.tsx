import {Button} from '@mui/material'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {RootState} from '../../redux/store'
import LoginForm from '../elements/LoginForm'
import Footer from '../elements/Footer'
import './Home.css'

const Home = () => {

  const islogin = useSelector((state: RootState) => state.items.isLogin)
  const isRegistered = useSelector(
    (state: RootState) => state.items.registrationData.isRegistering
  )
  
  const navigate = useNavigate()

  return (
    <div className="img-background">
      <div className="class-container">
        <main className="home-container">
          <h1> Painting store</h1>
          {!islogin && isRegistered && <LoginForm />}
          {!isRegistered && (
            <Button
              onClick={() => navigate('/registration')}
              color="primary"
              variant="contained"
            >
              Registration
            </Button>
          )}
        </main>
        <footer className="class-footer">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Home

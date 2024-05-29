import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {useNavigate} from 'react-router-dom'

import {textArrayGenerator} from '../../utils/generateRandomText'
import Footer from '../elements/Footer'
import './About.css'
import { useEffect } from 'react'

const About = () => {
  const isLogin = useSelector((state: RootState) => state.items.isLogin)
  const navigate = useNavigate()
  const arrText: string[] = textArrayGenerator(30)
console.log(isLogin)

useEffect(() => {
  if (!isLogin) {
    navigate('/')
  }
}, [isLogin, navigate])

  return (
    <div className="img-background__blur">
      <div className="class-container">
        <main>
          <div className=" about-container">
            <h1>About</h1>
            <>
              {arrText.map((elem, id) => (
                <p className="text" key={id}>
                  {elem}
                </p>
              ))}
            </>
          </div>
        </main>
        <footer className="class-footer">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default About

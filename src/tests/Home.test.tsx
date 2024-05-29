import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'

import store from '../redux/store'
import Home from '../components/pages/Home'

test('renders Painting store link', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  )
  const linkElement = screen.getByText(/Painting store/i)
  expect(linkElement).toBeTruthy()
})

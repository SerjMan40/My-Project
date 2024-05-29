import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import configureStore, {MockStoreEnhanced} from 'redux-mock-store'
import {RootState} from '../redux/store'
import {Action} from 'redux'
import {ThunkAction} from '@reduxjs/toolkit'

import {initialState} from '../redux/slices/itemsSlices'
import Item from '../components/elements/Item'
import {deleteItem, additionItem} from '../redux/slices/itemsSlices'
import {ItemProps} from '../types/interfaces'

type DispatchExts = ThunkAction<void, RootState, unknown, Action>
type StoreType = MockStoreEnhanced<RootState, DispatchExts>

const mockStore = configureStore<RootState, DispatchExts>([])

describe('Item component', () => {
  test('renders item correctly', () => {
    const item: ItemProps = {
      price: 100,
      img: 'https://example.com/image.jpg',
      author: 'John Doe',
      itemId: '1',
    }

    render(
      <Provider store={mockStore({items: initialState})}>
        <Item {...item} />
      </Provider>
    )

    expect(screen.getByText('Price: 100 $')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByAltText('any foto')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    )
  })

  test('calls dispatch with correct itemId when "Add" button is clicked', () => {
    const item: ItemProps = {
      price: 100,
      img: 'https://example.com/image.jpg',
      author: 'John Doe',
      itemId: '1',
    }

    const store: StoreType = mockStore({items: initialState})

    render(
      <Provider store={store}>
        <Item {...item} />
      </Provider>
    )

    fireEvent.click(screen.getByText('Add'))

    expect(store.getActions()).toEqual([additionItem('1')])
  })

  test('calls dispatch with correct itemId when "Delete" button is clicked', () => {
    const item: ItemProps = {
      price: 100,
      img: 'https://example.com/image.jpg',
      author: 'Mark Doda',
      itemId: '1',
    }

    const store: StoreType = mockStore({items: initialState})

    render(
      <Provider store={store}>
        <Item {...item} />
      </Provider>
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(store.getActions()).toEqual([deleteItem('1')])
  })
})

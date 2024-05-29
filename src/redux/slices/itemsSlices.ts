import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'

import imgArrGenerator from '../../utils/imgArrGenerator'
import {ArrOfObj, GeneralState} from '../../types/interfaces'

export const registrationData = {
  isRegistering: false,
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
}

export const initialState: GeneralState = {
  data: [],
  registrationData,
  isLogin: false,
  countChanged: 0,
  isBuy: false,
}

export const fetchData = createAsyncThunk('items/fetchData', async () => {
  return await imgArrGenerator(30)
})

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.registrationData.email === action.payload.email &&
      state.registrationData.password === action.payload.password
        ? (state.isLogin = true)
        : (state.isLogin = false)
    },
    isLogOut: (state) => {
      state.isLogin = false
    },
    isLogIn: (state) => {
      state.isLogin = true
    },
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload
      console.log(state.registrationData.isRegistering)
    },
    updeteItemList: (state, action: PayloadAction<ArrOfObj[]>) => {
      state.data = action.payload
    },
    additionItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((item) =>
        item.id === action.payload
          ? {...item, isChanged: !item.isChanged}
          : item
      )
    },
    isBuyItem: (state, action: PayloadAction<boolean>) => {
      state.isBuy = action.payload
    },
    cancelAllAdditionItem: (state) => {
      state.data = state.data.map((item) =>
        item.isChanged ? {...item, isChanged: false} : item
      )
    },
    countChangedItem: (state) => {
      state.countChanged = state.data.filter((item) => item.isChanged).length
    },
    resetCountChangedItem: (state) => {
      state.countChanged = 0
    },
    cancelSelection: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((item) =>
        item.id === action.payload
          ? {...item, isChanged: !item.isChanged}
          : item
      )
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload)
    },
    deleteIAlltem: (state) => {
      state.data = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const {
  deleteItem,
  additionItem,
  setRegistrationData,
  setLoginData,
  deleteIAlltem,
  cancelSelection,
  countChangedItem,
  cancelAllAdditionItem,
  isBuyItem,
  resetCountChangedItem,
  isLogOut,
  isLogIn,
} = itemsSlice.actions

export default itemsSlice.reducer

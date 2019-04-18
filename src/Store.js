import React from 'react'
import { ACTION } from './constants/constants'

export const Store = React.createContext()

const initialState = {
  firstTableResults: [],
  secondTableResults: []
}

function reducer (state, action) {
  switch (action.type) {
    case ACTION.ADD_FIRST_TABLE_NUMBER:
      return {
        ...state,
        firstTableResults: [...state.firstTableResults, { id: action.payload.id }]
      }
    case ACTION.ADD_SECOND_TABLE_NUMBER:
      return {
        ...state,
        secondTableResults: [...state.secondTableResults, { id: action.payload.id }]
      }
    case ACTION.DEL_FIRST_TABLE_NUMBER:
      return {
        ...state,
        firstTableResults: state.firstTableResults.filter(el => el.id !== action.payload.id)
      }
    case ACTION.DEL_SECOND_TABLE_NUMBER:
      return {
        ...state,
        secondTableResults: state.secondTableResults.filter(el => el.id !== action.payload.id)
      }
    case ACTION.CLEAN_TABLES:
      return initialState
    default:
      return state
  }
}

export function StoreProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}
  </Store.Provider>
}
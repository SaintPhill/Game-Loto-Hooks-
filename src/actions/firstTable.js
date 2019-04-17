import { ACTION } from '../constants/constants'

export function add_first_table_number (id) {
  return {
    type: ACTION.ADD_FIRST_TABLE_NUMBER,
    payload: {
      id
    }
  }
}

export function del_first_table_number (id) {
  return {
    type: ACTION.DEL_FIRST_TABLE_NUMBER,
    payload: {
      id
    }
  }
}
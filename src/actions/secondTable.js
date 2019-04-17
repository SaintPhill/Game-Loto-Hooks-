import { ACTION } from '../constants/constants'

export function add_second_table_number (id) {
  return {
    type: ACTION.ADD_SECOND_TABLE_NUMBER,
    payload: {
      id
    }
  }
}

export function del_second_table_number (id) {
  return {
    type: ACTION.DEL_SECOND_TABLE_NUMBER,
    payload: {
      id
    }
  }
}
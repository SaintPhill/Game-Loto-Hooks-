import { ACTION } from '../constants/constants'

export function cleanTables () {
  return {
    type: ACTION.CLEAN_TABLES
  }
}
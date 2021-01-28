import { allCasesListType, caseType } from '../types/casesReducer.types'
import axios from './axios.config'

export const casesInProgressAPI = {
  getAllCasesInProgress: async (): Promise<allCasesListType> => {
    const casesInProgress = await axios.get('cases/inprogress')
    return casesInProgress.data
  },
  takeCaseInProgress: async (_id: string): Promise<void> => {
    await axios.put(`cases/toprogress/${_id}`)
  },
}

import { allCasesListType, caseType } from '../types/casesReducer.types'
import axios from './axios.config'

export const casesInProgressAPI = {
  takeCaseInProgress: async (_id: string): Promise<void> => {
    await axios.put(`/cases/toprogress/${_id}`)
  },
  completeCase: async (_id: string): Promise<caseType> => {
    const completedCase = await axios.put(`/cases/complete/${_id}`)
    return completedCase.data
  },
  getAllCompletedCases: async (): Promise<allCasesListType> => {
    const completedCases = await axios.get('cases/completed')
    return completedCases.data
  },
}

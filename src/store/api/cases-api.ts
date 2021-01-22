import axios from './axios.config'
import { caseType, allCasesListType } from '../types/casesReducer.types'

export const caseAPI = {
  addCase: async (newCase: caseType): Promise<void> => {
    await axios.post<caseType>('cases/add', JSON.stringify(newCase))
  },
  getAllCases: async (): Promise<allCasesListType> => {
    const allCases = await axios.get<allCasesListType>('cases/')
    return allCases.data
  },
  getCurrentCase: async (_id: string): Promise<caseType> => {
    const currentCase = await axios.get<caseType>(`/cases/${_id}`)
    return currentCase.data
  },
  editCurrentCase: async (
    editedCase: caseType,
    _id: string
  ): Promise<caseType> => {
    const savedEditedCase = await axios.put<caseType>(
      `/cases/edit/${_id}`,
      JSON.stringify(editedCase)
    )
    return savedEditedCase.data
  },
  deleteCase: async (_id: string): Promise<void> => {
    await axios.delete(`cases/remove/${_id}`)
  },
}

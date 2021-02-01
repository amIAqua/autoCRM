import { caseCostsListType } from '../types/costsService.types'
import axios from './axios.config'

export const costsAPI = {
  saveCustomersCostsList: async (
    costsList: caseCostsListType,
    _id: string
  ): Promise<void> => {
    try {
      await axios.post<caseCostsListType>(
        `/costs/${_id}`,
        JSON.stringify(costsList)
      )
    } catch (error) {}
  },
}

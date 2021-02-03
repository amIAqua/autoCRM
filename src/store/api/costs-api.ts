import { caseCostsListType } from '../types/costsService.types'
import axios from './axios.config'

export const costsAPI = {
  saveCustomersCostsList: async (
    costsList: caseCostsListType,
    totalPrice: number,
    _id: string
  ): Promise<void> => {
    try {
      await axios.post<caseCostsListType>(
        `/costs/${_id}`,
        JSON.stringify({ costsList, totalPrice })
      )
    } catch (error) {}
  },
  getCurrentCaseCostsList: async (
    _id: string
  ): Promise<caseCostsListType | undefined> => {
    try {
      const costsList = await axios.get<caseCostsListType>(`/costs/${_id}`)
      return costsList.data
    } catch (error) {}
  },
}

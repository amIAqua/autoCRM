import { pricesListType } from '../types/pricesService.types'
import axios from './axios.config'

export const pricelistAPI = {
  getAllPricelist: async (): Promise<pricesListType> => {
    const pricelist = await axios.get('pricelist/')
    return pricelist.data
  },
}

import { makeObservable, observable, action, computed } from 'mobx'
import { pricelistAPI } from '../api/pricelist-api'
import { appService } from './AppService'
import { priceListItemType, pricesListType } from '../types/pricesService.types'

class PricelistService {
  _pricelistItem: priceListItemType = null
  _pricelist: pricesListType = []

  constructor() {
    makeObservable(this, {
      _pricelist: observable,
      _pricelistItem: observable,
      getAllPricelistFromDB: action,
      pricelistLength: computed,
    })
  }

  // field getters
  get priceslist() {
    return this._pricelist
  }

  get currentPricelistItem() {
    return this._pricelistItem
  }

  // actions
  async getAllPricelistFromDB() {
    try {
      appService.setLoadingTrue()
      const pricelist: pricesListType = await pricelistAPI.getAllPricelist()

      this.setPricelist(pricelist)
      appService.setLoadingFalse()
    } catch (error) {
      // error handler
    }
  }

  // setters
  setPricelist(fetchedPricelist: pricesListType) {
    this._pricelist = fetchedPricelist
  }

  // computed
  get pricelistLength() {
    return this._pricelist.length
  }
}

export const pricelistService = new PricelistService()

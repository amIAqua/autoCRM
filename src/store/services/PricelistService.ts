import { makeAutoObservable, observable, action, computed } from 'mobx'
import { pricelistAPI } from '../api/pricelist-api'
import { priceListItemType, pricesListType } from '../types/pricesService.types'

class PricelistService {
  private _pricelistItem: priceListItemType = null
  _pricelist: pricesListType = []

  constructor() {
    makeAutoObservable(this, {
      _pricelist: observable,
      getAllPricelistFromDB: action,
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
      const pricelist: pricesListType = await pricelistAPI.getAllPricelist()

      this.setPricelist(pricelist)
    } catch (error) {
      // error handler
    }
  }

  // setters
  setPricelist(fetchedPricelist: pricesListType) {
    this._pricelist = fetchedPricelist
  }
}

export const pricelistService = new PricelistService()

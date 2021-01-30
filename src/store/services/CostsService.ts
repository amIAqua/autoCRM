import { makeObservable, observable, action, computed, toJS } from 'mobx'
import { casePosition, caseCostsListType } from '../types/costsService.types'
import { priceListItemType } from '../types/pricesService.types'
import { pricelistService } from './PricelistService'

class CostsService {
  _caseCostsList: caseCostsListType = []
  _totalCasePrice: number = 0
  _textValue: string = ''

  constructor() {
    makeObservable(this, {
      _caseCostsList: observable,
      _totalCasePrice: observable,
      _textValue: observable,
      caseCostsList: computed,
      totalCasePrice: computed,
      textValue: computed,
      setTextValue: action,
      addPosition: action,
      reduceTotalPrice: action,
      deletePosition: action,
    })
  }

  // fields getters
  get caseCostsList() {
    return this._caseCostsList
  }

  get totalCasePrice() {
    return this._totalCasePrice
  }

  get textValue() {
    return this._textValue
  }

  // actions
  setTextValue(value: string) {
    this._textValue = value
  }

  addPosition() {
    const pricelistItem: priceListItemType = toJS(
      pricelistService.priceslist.find(
        (item: priceListItemType) => item!.text === this.textValue
      )
    )

    if (pricelistItem) {
      this._caseCostsList.push(pricelistItem)
      this.reduceTotalPrice(pricelistItem.price)
    }
  }

  reduceTotalPrice(positionPrice: number) {
    this._totalCasePrice += positionPrice
  }

  deletePosition(_id: string) {
    this._caseCostsList = this._caseCostsList.filter(
      (item: priceListItemType) => item?._id !== _id
    )
  }
}

export const costsService = new CostsService()

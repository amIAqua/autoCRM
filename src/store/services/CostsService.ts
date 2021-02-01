import { makeObservable, observable, action, computed, toJS } from 'mobx'
import { caseCostsListType } from '../types/costsService.types'
import { priceListItemType } from '../types/pricesService.types'
import { pricelistService } from './PricelistService'
import { costsAPI } from '../api/costs-api'
import { dinero } from '../../utils/dineroHelpers'

class CostsService {
  _caseCostsList: caseCostsListType = []
  _totalCasePrice = dinero(0)
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
      substractFromTotal: action,
      findItem: action,
      findCandidateByText: action,
      saveCostsList: action,
      setCostsList: action,
    })
  }

  // fields getters
  get caseCostsList() {
    return this._caseCostsList
  }

  get totalCasePrice() {
    return this._totalCasePrice.toFormat('$0,0.00')
  }

  get textValue() {
    return this._textValue
  }

  // actions
  setTextValue(value: string) {
    this._textValue = value
  }

  // find item in costs list if exists
  findCandidateByText(text: string) {
    return this.caseCostsList.find(
      (item: priceListItemType) => item?.text === text
    )
  }

  // adding new position to costs list
  addPosition() {
    const pricelistItem: priceListItemType = toJS(
      pricelistService.priceslist.find(
        (item: priceListItemType) => item!.text === this.textValue
      )
    )

    const candidate = this.findCandidateByText(pricelistItem!.text)

    if (pricelistItem && !candidate) {
      this._caseCostsList.push(pricelistItem)
      this.reduceTotalPrice(pricelistItem.price)
    }
  }

  setCostsList(value: any) {
    this._caseCostsList = value
  }

  // saving costs list to database
  async saveCostsList(_id: string) {
    try {
      if (!this.caseCostsList.length) return
      await costsAPI.saveCustomersCostsList(toJS(this._caseCostsList), _id)

      this.setCostsList([])
    } catch (error) {}
  }

  // counting the total price of costs list
  reduceTotalPrice(positionPrice: any) {
    this._totalCasePrice = this._totalCasePrice.add(
      dinero(parseInt(positionPrice))
    )
  }

  // find item in costs list by id
  findItem(_id: string) {
    return this.caseCostsList.find(
      (item: priceListItemType) => item?._id === _id
    )
  }

  // substracting deleted item price from total price
  substractFromTotal(amount: number) {
    this._totalCasePrice = this._totalCasePrice.subtract(dinero(amount))
  }

  // delete item from costs list by id
  deletePosition(_id: string) {
    const currentDeleted: priceListItemType = this.findItem(_id)

    this.substractFromTotal(currentDeleted!.price!)

    this._caseCostsList = this._caseCostsList.filter(
      (item: priceListItemType) => item?._id !== _id
    )
  }
}

export const costsService = new CostsService()

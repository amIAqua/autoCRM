import { makeObservable, observable, action, computed, toJS } from 'mobx'
import { caseCostsListType, casePosition } from '../types/costsService.types'
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
      setZeroTotalPrice: action,
      addPosition: action,
      reduceTotalPrice: action,
      deletePosition: action,
      substractFromTotal: action,
      findItem: action,
      getCurrentCaseCostsList: action,
      findCandidateByText: action,
      saveCostsList: action,
      setCostsList: action,
      setCostsTotal: action,
    })
  }

  // fields getters
  get caseCostsList() {
    return toJS(this._caseCostsList)
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

  setZeroTotalPrice() {
    this._totalCasePrice = dinero(0)
  }

  setCostsList(value: caseCostsListType) {
    this._caseCostsList = value
  }

  setCostsTotal(total: number) {
    this._totalCasePrice = dinero(total)
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

    console.log(typeof pricelistItem?.price)

    if (pricelistItem && !candidate) {
      this._caseCostsList.push(pricelistItem)
      this.reduceTotalPrice(pricelistItem.price)
    }
  }

  // saving costs list to database
  async saveCostsList(_id: string) {
    try {
      if (!this.caseCostsList.length) return
      await costsAPI.saveCustomersCostsList(
        toJS(this._caseCostsList),
        toJS(this._totalCasePrice.getAmount()),
        _id
      )

      this.setCostsList([])
      this.setZeroTotalPrice()
    } catch (error) {}
  }

  async getCurrentCaseCostsList(_id: string) {
    try {
      let currentCaseList: any = await costsAPI.getCurrentCaseCostsList(_id)

      if (currentCaseList[0]) {
        const costsList: caseCostsListType = []

        currentCaseList[0].costs.map((item: casePosition) => {
          costsList.push({
            _id: item!._id,
            text: item!.text,
            price: item!.price,
          })
        })

        this.setCostsList(costsList)
        this.setCostsTotal(currentCaseList[0].totalPrice)
      } else {
        this.setCostsList([])
        this.setCostsTotal(0)
      }
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

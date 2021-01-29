export type priceListItemType = {
  _id: string
  text: string
  price: string
} | null

export type pricesListType = Array<priceListItemType>

type tableItemType = {
  position: string
  key: string
  price: string
  order: number
}

export type tableItemListType = Array<tableItemType> | null

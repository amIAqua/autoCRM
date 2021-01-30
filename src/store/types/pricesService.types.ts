export type priceListItemType =
  | {
      _id: string
      text: string
      price: number
    }
  | null
  | undefined

export type pricesListType = Array<priceListItemType>

type tableItemType = {
  position: string
  key: string
  price: number
  order: number
}

export type tableItemListType = Array<tableItemType> | null

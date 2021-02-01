import React from 'react'
import { pricelistService } from '../store/services/PricelistService'
import {
  priceListItemType,
  tableItemListType,
} from '../store/types/pricesService.types'
import { formatedPrice } from '../utils/dineroHelpers'

export const usePricelist = (): any => {
  const [pricelist, setPricelist] = React.useState<tableItemListType>()

  const createTableData = () => {
    // TODO ITEM TYPE INCOMPARABLE
    const data: any = pricelistService.priceslist.map(
      (item: priceListItemType, index: number) => {
        return {
          key: item!._id,
          order: index + 1,
          position: item!.text,
          price: formatedPrice(item!.price),
        }
      }
    )
    setPricelist(data)
  }

  React.useEffect(() => {
    if (pricelistService.pricelistLength) {
      return
    }
    pricelistService.getAllPricelistFromDB()
  }, [])

  React.useEffect(() => {
    createTableData()
  }, [pricelistService.priceslist])

  return { pricelist }
}

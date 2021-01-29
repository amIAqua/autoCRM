import React from 'react'
import { tableItemListType } from '../../store/types/pricesService.types'
import { pricelistService } from '../../store/services/PricelistService'
import { priceListItemType } from '../../store/types/pricesService.types'

export const columns = [
  {
    title: 'No.',
    dataIndex: 'order',
    key: 'order',
    render: (order: number) => <p>{order}</p>,
  },

  {
    title: 'Позиция',
    dataIndex: 'position',
    key: 'position',
    render: (text: string) => <h3>{text}</h3>,
  },
  {
    title: 'Стоимость',
    dataIndex: 'price',
    key: 'price',
    render: (price: string) => <h3>{price}$</h3>,
  },
]

export const usePricelist = (): any => {
  const [pricelist, setPricelist] = React.useState<tableItemListType>()

  const createTableData = () => {
    const data: tableItemListType = pricelistService.priceslist.map(
      (item: priceListItemType, index: number) => {
        return {
          key: item!._id,
          order: index + 1,
          position: item!.text,
          price: item!.price,
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

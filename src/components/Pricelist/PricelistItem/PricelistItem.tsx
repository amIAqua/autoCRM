import { Row } from 'antd'
import React from 'react'
import { priceListItemType } from '../../../store/types/pricesService.types'

type Props = {
  item: priceListItemType
}

export const PricelistItem: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <Row>
        <h3>{item?.text}</h3>
        <p>/</p>
        <h3>{item?.price}$</h3>
        <p>/</p>
        <h3>{item?._id}</h3>
      </Row>
    </div>
  )
}

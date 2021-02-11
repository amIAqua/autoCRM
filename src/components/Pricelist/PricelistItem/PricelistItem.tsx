import { Row } from 'antd'
import { priceListItemType } from '../../../store/types/pricesService.types'

type Props = {
  item: priceListItemType
  order_by: number
}

export const PricelistItem: React.FC<Props> = ({ item, order_by }) => {
  return (
    <div className='pricelist-item'>
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ marginBottom: '0px', paddingLeft: '10px' }}>
          {item?.text}
        </h3>
        <h3 style={{ marginBottom: '0px', paddingRight: '10px' }}>
          <b>{item?.price}$</b>
        </h3>
      </Row>
    </div>
  )
}

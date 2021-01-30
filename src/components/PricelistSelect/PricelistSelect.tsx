import { FC } from 'react'
import { Card, Button } from 'antd'
import { usePricelistSelection } from '../../utils/usePricelistSelection'
import { costsService } from '../../store/services/CostsService'

export const PricelistSelect: FC = () => {
  const { returnSelectWithOptions } = usePricelistSelection()

  return (
    <div className='container'>
      <Card title='Выбор из прайс-листа' className='costs-case-card'>
        {returnSelectWithOptions()}
        <Button type='primary' onClick={() => costsService.addPosition()}>
          Добавить
        </Button>
      </Card>
    </div>
  )
}

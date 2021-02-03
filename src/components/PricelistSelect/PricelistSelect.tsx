import { FC } from 'react'
import { Card, Button } from 'antd'
import { usePricelistSelection } from '../../utils/usePricelistSelection'
import { costsService } from '../../store/services/CostsService'
import { pricelistService } from '../../store/services/PricelistService'
import { observer } from 'mobx-react'
import { caseType } from '../../store/types/casesReducer.types'

type Props = {
  currentCase: caseType
}

export const PricelistSelect: FC<Props> = observer(({ currentCase }) => {
  const { returnSelectWithOptions } = usePricelistSelection()

  return (
    <div className='container'>
      {!currentCase.costed ? (
        pricelistService.pricelistLength ? (
          <Card title='Выбор из прайс-листа' className='costs-case-card'>
            {returnSelectWithOptions()}
            <Button
              type='primary'
              onClick={() => costsService.addPosition()}
              style={{ marginLeft: '10px' }}
            >
              Добавить
            </Button>
          </Card>
        ) : null
      ) : null}
    </div>
  )
})

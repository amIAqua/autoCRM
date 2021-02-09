import { FC } from 'react'
import { Card, Button } from 'antd'
import { usePricelistSelection } from '../../utils/usePricelistSelection'
import { costsService } from '../../store/services/CostsService'
import { pricelistService } from '../../store/services/PricelistService'
import { observer } from 'mobx-react'
import { caseType } from '../../store/types/casesReducer.types'
import { useTranslation } from 'react-i18next'

type Props = {
  currentCase: caseType
}

export const PricelistSelect: FC<Props> = observer(({ currentCase }) => {
  const { returnSelectWithOptions } = usePricelistSelection()
  const { t } = useTranslation()

  return (
    <div className='container'>
      {!currentCase.costed ? (
        pricelistService.pricelistLength ? (
          <Card title={t('Выбор из прайс-листа')} className='costs-case-card'>
            {returnSelectWithOptions()}
            <Button
              type='primary'
              onClick={() => costsService.addPosition()}
              style={{ marginLeft: '10px' }}
            >
              {t('Добавить')}
            </Button>
          </Card>
        ) : null
      ) : null}
    </div>
  )
})

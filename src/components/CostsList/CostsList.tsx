import { FC, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Card, Divider } from 'antd'
import { costsService } from '../../store/services/CostsService'
import { formatedPrice } from '../../utils/dineroHelpers'
import { priceListItemType } from '../../store/types/pricesService.types'
import { caseType } from '../../store/types/casesReducer.types'
import { useTranslation } from 'react-i18next'

type Props = {
  _id: string
  currentCase: caseType
}

export const CostsList: FC<Props> = observer(({ _id, currentCase }) => {
  const { t } = useTranslation()

  const deleteItemHandler = (_id: string) => {
    costsService.deletePosition(_id)
  }

  const addCostsListHandler = () => {
    costsService.saveCostsList(_id)
  }

  useEffect(() => {
    costsService.getCurrentCaseCostsList(_id)
  }, [_id])

  const placeCostsListData = () => {
    return costsService.caseCostsList.map((item: priceListItemType) => {
      return (
        <div
          key={item!._id}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <h4 style={{ color: 'rgb(175, 175, 175)' }}>{t(item!.text)}</h4>
          <h4 style={{ color: 'rgb(175, 175, 175)' }}>
            {formatedPrice(item!.price)}
          </h4>
          {!currentCase.costed ? (
            <Button
              size='small'
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px',
                color: 'red',
                border: '1px solid red',
              }}
              onClick={() => deleteItemHandler(item!._id)}
            >
              <p>&times;</p>
            </Button>
          ) : null}
        </div>
      )
    })
  }

  return (
    <div className='container'>
      <Card title={t('Смета')} className='costs-case-card'>
        {costsService.caseCostsList.length ? (
          placeCostsListData()
        ) : (
          <p style={{ color: 'rgb(175, 175, 175)' }}>{t('Смета пуста')} :(</p>
        )}

        <Divider />
        <h3 style={{ color: 'rgb(175, 175, 175)' }}>
          {t('Итого')}: {costsService.totalCasePrice}
        </h3>
        <Divider />
        {currentCase.costed ? null : (
          <Button
            type='primary'
            style={{ borderRadius: '20px' }}
            onClick={addCostsListHandler}
          >
            {t('Сохранить')}
          </Button>
        )}
      </Card>
    </div>
  )
})

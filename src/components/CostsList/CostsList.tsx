import { FC, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Card, Divider } from 'antd'
import { costsService } from '../../store/services/CostsService'
import { formatedPrice } from '../../utils/dineroHelpers'
import { priceListItemType } from '../../store/types/pricesService.types'
import { caseType } from '../../store/types/casesReducer.types'

type Props = {
  _id: string
  currentCase: caseType
}

export const CostsList: FC<Props> = observer(({ _id, currentCase }) => {
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
    // if (costsService.caseCostsList.length) {
    return costsService.caseCostsList.map((item: priceListItemType) => {
      return (
        <div
          key={item!._id}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <h4>{item!.text}</h4>
          <h4>{formatedPrice(item!.price)}</h4>
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
        </div>
      )
    })

    //  }
  }

  return (
    <div className='container'>
      <Card title='Смета' className='costs-case-card'>
        {costsService.caseCostsList.length ? (
          placeCostsListData()
        ) : (
          <p>Смета пуста :(</p>
        )}

        <Divider />
        <h3>Итого: {costsService.totalCasePrice}</h3>
        <Divider />
        <Button
          type='primary'
          style={{ borderRadius: '20px' }}
          onClick={addCostsListHandler}
        >
          Сохранить
        </Button>
      </Card>
    </div>
  )
})

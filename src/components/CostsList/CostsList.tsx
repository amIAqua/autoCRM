import { FC } from 'react'
import { observer } from 'mobx-react'
import { Button, Card, Divider } from 'antd'
import { costsService } from '../../store/services/CostsService'
import { formatedPrice } from '../../utils/dineroHelpers'

type Props = {
  _id: string
}

export const CostsList: FC<Props> = observer(({ _id }) => {
  const deleteItemHandler = (_id: string) => {
    costsService.deletePosition(_id)
  }

  const addCostsListHandler = () => {
    costsService.saveCostsList(_id)
  }

  return (
    <div className='container'>
      <Card title='Смета' className='costs-case-card'>
        {costsService.caseCostsList.length
          ? costsService.caseCostsList.map((item: any) => {
              return (
                <div
                  key={item._id}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h4>{item.text}</h4>
                  <h4>{formatedPrice(item.price)}</h4>
                  <Button
                    size='small'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: '5px',
                      color: 'red',
                      border: '1px solid red',
                    }}
                  >
                    <p onClick={() => deleteItemHandler(item._id)}>&times;</p>
                  </Button>
                </div>
              )
            })
          : 'Смета пуста :('}
        <Divider />
        <h3>Итого: {costsService.totalCasePrice}</h3>
        <Divider />
        <Button
          type='primary'
          onClick={addCostsListHandler}
          style={{ borderRadius: '20px' }}
        >
          Сохранить
        </Button>
      </Card>
    </div>
  )
})

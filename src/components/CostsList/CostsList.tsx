import { FC } from 'react'
import { observer } from 'mobx-react'
import { Card, Divider } from 'antd'
import { costsService } from '../../store/services/CostsService'

export const CostsList: FC = observer(() => {
  const deleteItemHandler = (_id: string) => {
    costsService.deletePosition(_id)
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
                  <p onClick={() => deleteItemHandler(item._id)}>&times;</p>
                </div>
              )
            })
          : 'пусто'}
        <Divider />
        {costsService.totalCasePrice}
      </Card>
    </div>
  )
})

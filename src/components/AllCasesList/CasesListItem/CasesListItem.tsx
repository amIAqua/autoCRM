import React from 'react'
import { Button, Descriptions, Divider } from 'antd'
import { NavLink } from 'react-router-dom'
import { getFullName } from '../../../utils/name_utils'
import { caseType } from '../../../store/types/casesReducer.types'

type Props = {
  item: caseType
}

export const CasesListItem: React.FC<Props> = ({ item }) => {
  return (
    <div className='case-card'>
      <div>
        <Descriptions title={`No. ${item.caseId}`}>
          <Descriptions.Item label='Владелец'>
            <b>{getFullName(item.ownerInfo.name, item.ownerInfo.surname)}</b>
          </Descriptions.Item>
          <Descriptions.Item label='Дата оформления заявки'>
            <b>{item.navigation.createdDate}</b>
          </Descriptions.Item>

          {item.completed ? (
            <Descriptions.Item label='Дата выполнения заявки'>
              <b>{item.navigation.completedDate}</b>
            </Descriptions.Item>
          ) : null}
        </Descriptions>
        <Divider />
      </div>

      <NavLink to={`cases/${item._id}`}>
        <Button
          className='button'
          type='primary'
          style={{ marginBottom: '10px' }}
        >
          Подробнее
        </Button>
      </NavLink>
    </div>
  )
}

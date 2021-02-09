import React from 'react'
import { Button, Descriptions, Divider } from 'antd'
import { NavLink } from 'react-router-dom'
import { getFullName } from '../../../utils/name_utils'
import { caseType } from '../../../store/types/casesReducer.types'
import { useTranslation } from 'react-i18next'

type Props = {
  item: caseType
}

export const CasesListItem: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation()
  return (
    <div className='case-card'>
      <div>
        <Descriptions title={`No. ${item.caseId}`}>
          <Descriptions.Item label={t('Владелец')}>
            <b>{getFullName(item.ownerInfo.name, item.ownerInfo.surname)}</b>
          </Descriptions.Item>
          <Descriptions.Item label={t('Дата оформления заявки')}>
            <b>{item.navigation.createdDate}</b>
          </Descriptions.Item>

          {item.completed ? (
            <Descriptions.Item label={t('Дата выполнения заявки')}>
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
          {t('Подробнее')}
        </Button>
      </NavLink>
    </div>
  )
}

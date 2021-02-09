import React, { ChangeEvent } from 'react'
import { Input } from 'antd'
import { fuse } from '../../utils/FuseSearch'
import { useTranslation } from 'react-i18next'

const { Search } = Input

export const PricesSearch: React.FC = () => {
  const { t } = useTranslation()
  const changeSearchQueryHandler = (event: ChangeEvent<HTMLInputElement>) => {
    fuse.setSearchQuery(event.currentTarget.value)
  }
  return (
    <div className='search-container container'>
      <Search
        placeholder={t('Поиск по прайс-листу')}
        style={{ width: '500px' }}
        allowClear
        onChange={changeSearchQueryHandler}
        enterButton={t('Найти')}
        size='middle'
      />
    </div>
  )
}

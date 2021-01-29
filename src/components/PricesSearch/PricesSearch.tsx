import React, { ChangeEvent } from 'react'
import { Input } from 'antd'
import { fuse } from '../../utils/FuseSearch'

const { Search } = Input

export const PricesSearch: React.FC = () => {
  const changeSearchQueryHandler = (event: ChangeEvent<HTMLInputElement>) => {
    fuse.setSearchQuery(event.currentTarget.value)
  }
  return (
    <div className='search-container container'>
      <Search
        placeholder='Поиск по прайс-листу'
        style={{ width: '500px' }}
        allowClear
        onChange={changeSearchQueryHandler}
        enterButton='Найти'
        size='middle'
      />
    </div>
  )
}

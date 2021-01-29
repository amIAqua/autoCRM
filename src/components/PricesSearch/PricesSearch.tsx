import React from 'react'
import { Input } from 'antd'

const { Search } = Input

export const PricesSearch: React.FC = () => {
  return (
    <div className='search-container container'>
      <Search
        placeholder='Поиск по прайс-листу'
        style={{ width: '500px' }}
        allowClear
        enterButton='Найти'
        size='middle'
      />
    </div>
  )
}

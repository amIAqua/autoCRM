import React from 'react'
import { observer } from 'mobx-react'
import { pricelistService } from '../../store/services/PricelistService'
import { columns, usePricelist } from './pricelist-table-config'
import { Loader } from '../Loader/Loader'
import { Table } from 'antd'
import { appService } from '../../store/services/AppService'

export const Pricelist: React.FC = observer(() => {
  const { pricelist } = usePricelist()

  return (
    <div>
      <h4 style={{ marginTop: '10px' }}>
        Позиций в списке:&nbsp;{pricelistService.pricelistLength}
      </h4>

      <Table
        columns={columns}
        dataSource={pricelist}
        loading={appService.loading}
      />
    </div>
  )
})

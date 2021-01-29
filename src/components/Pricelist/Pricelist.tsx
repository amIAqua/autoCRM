import React from 'react'
import { observer } from 'mobx-react'
import { pricelistService } from '../../store/services/PricelistService'
import { columns } from './pricelist-table-config'
import { usePricelist } from '../../utils/usePricelist'
import { Table } from 'antd'
import { appService } from '../../store/services/AppService'
import { fuse } from '../../utils/FuseSearch'

export const Pricelist: React.FC = observer(() => {
  const { pricelist } = usePricelist()

  React.useEffect(() => {
    fuse.searchToggler()
  }, [fuse.searchQueryGetter])

  return (
    <div>
      <h4 style={{ marginTop: '10px' }}>
        Позиций в списке:&nbsp;{pricelistService.pricelistLength}
      </h4>

      <Table
        columns={columns}
        dataSource={fuse.searchQueryGetter ? fuse.searchResults : pricelist}
        loading={appService.loading}
      />
    </div>
  )
})

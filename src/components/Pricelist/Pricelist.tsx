import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { pricelistService } from '../../store/services/PricelistService'
import { useTableColumns } from './pricelist-table-config'
import { usePricelist } from '../../utils/usePricelist'
import { Table } from 'antd'
import { appService } from '../../store/services/AppService'
import { fuse } from '../../utils/FuseSearch'
import { useTranslation } from 'react-i18next'

export const Pricelist: React.FC = observer(() => {
  const { t } = useTranslation()
  const { pricelist } = usePricelist()
  const tableColumns = useTableColumns()

  useEffect(() => {
    fuse.searchToggler()
  }, [fuse.searchQueryGetter])

  return (
    <div>
      <h4 style={{ marginTop: '10px' }}>
        {t('Позиций в списке')}:&nbsp;{pricelistService.pricelistLength}
      </h4>

      <Table
        columns={tableColumns()}
        dataSource={fuse.searchQueryGetter ? fuse.searchResults : pricelist}
        loading={appService.loading}
      />
    </div>
  )
})

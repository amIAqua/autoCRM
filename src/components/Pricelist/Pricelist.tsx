import React from 'react'
import { observer } from 'mobx-react'
import { PricelistItem } from './PricelistItem/PricelistItem'
import { pricelistService } from '../../store/services/PricelistService'
import { priceListItemType } from '../../store/types/pricesService.types'
import { useSelector } from 'react-redux'
import { RootAppState } from '../../store'
import { loadingSelector } from '../../store/selectors'
import { Loader } from '../Loader/Loader'

export const Pricelist: React.FC = observer(() => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))

  React.useEffect(() => {
    pricelistService.getAllPricelistFromDB()
  }, [])

  return (
    <div>
      {loading ? <Loader /> : null}
      {pricelistService.priceslist.map((item: priceListItemType) => {
        return <PricelistItem item={item} key={item!._id} />
      })}
    </div>
  )
})

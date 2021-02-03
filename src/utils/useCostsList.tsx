import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader/Loader'
import { RootAppState } from '../store'
import { currentCaseSelector } from '../store/selectors'
import { costsService } from '../store/services/CostsService'
import { priceListItemType } from '../store/types/pricesService.types'
import { formatedPrice } from './dineroHelpers'

export const useCostsList = () => {
  const currentCase = useSelector((state: RootAppState) =>
    currentCaseSelector(state)
  )

  useEffect(() => {
    if (currentCase._id) {
      costsService.getCurrentCaseCostsList(currentCase._id)
    }
  }, [])

  const getList = () => {
    return (
      <div>
        {currentCase.costed ? (
          costsService.caseCostsList.map((item: priceListItemType) => {
            return (
              <div
                key={item!._id}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <h4>{item!.text}</h4>
                <h4>{formatedPrice(item!.price)}</h4>
                {/* <Button
              size='small'
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px',
                color: 'red',
                border: '1px solid red',
              }}
              onClick={() => deleteItemHandler(item!._id)}
            >
              <p >&times;</p>
            </Button> */}
              </div>
            )
          })
        ) : (
          <Loader />
        )}
      </div>
    )
  }

  return { getList }
}

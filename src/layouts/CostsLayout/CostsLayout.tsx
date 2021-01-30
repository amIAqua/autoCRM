import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CostsList } from '../../components/CostsList/CostsList'
import { CreateCostsCard } from '../../components/CreateCostsCard/CreateCostsCard'
import { Loader } from '../../components/Loader/Loader'
import { PricelistSelect } from '../../components/PricelistSelect/PricelistSelect'
import { RootAppState } from '../../store'
import { getCaseDetails } from '../../store/reducers/case_Reducer'
import { currentCaseSelector, loadingSelector } from '../../store/selectors'

type Params = {
  _id: string
}

export const CostsLayout: FC = () => {
  const currentCase = useSelector((state: RootAppState) =>
    currentCaseSelector(state)
  )
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const { _id }: Params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentCase._id === _id) {
      return
    }
    dispatch(getCaseDetails(_id))
  }, [_id])

  if (loading) {
    return <Loader />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CreateCostsCard currentCase={currentCase} />
      <PricelistSelect />
      <CostsList />
    </div>
  )
}

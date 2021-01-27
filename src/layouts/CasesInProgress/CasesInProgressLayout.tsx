import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootAppState } from '../../store'
import { allCasesListType } from '../../store/types/casesReducer.types'
import { getAllCasesInProgress } from '../../store/reducers/caseInProgress_reducer'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { ListLength } from '../../components/ListLength/ListLength'
import { useMessages } from '../../utils/useMessages'
import { clearError } from '../../utils/helpers'
import {
  casesInProgressSelector,
  errorsSelector,
  loadingSelector,
} from '../../store/selectors'

export const CasesInProgressLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const casesInProgressList: allCasesListType = useSelector(
    (state: RootAppState) => casesInProgressSelector(state)
  )
  const { errorMessage } = useMessages()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCasesInProgress())

    if (error) {
      errorMessage(error.message)
    }
    return () => clearError(dispatch)
  }, [])

  if (error) return <NothingWasFetched />

  if (!casesInProgressList.length && !loading) return <NothingWasFetched />

  return (
    <div>
      <div className='content-section'>
        {casesInProgressList && !loading ? (
          <ListLength length={casesInProgressList.length} />
        ) : null}
        {loading ? <Loader /> : <AllCasesList allCases={casesInProgressList} />}
      </div>
    </div>
  )
}

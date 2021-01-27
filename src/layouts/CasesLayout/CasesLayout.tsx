import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootAppState } from '../../store'
import { getAllCases } from '../../store/reducers/case_Reducer'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'
import { allCasesListType } from '../../store/types/casesReducer.types'
import { ListLength } from '../../components/ListLength/ListLength'
import { useMessages } from '../../utils/useMessages'
import { clearError } from '../../utils/helpers'
import {
  casesSelector,
  errorsSelector,
  loadingSelector,
} from '../../store/selectors'

export const CasesLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const allCasesList: allCasesListType = useSelector((state: RootAppState) =>
    casesSelector(state)
  )
  const { errorMessage } = useMessages()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCases())

    if (error) {
      errorMessage(error.message)
    }
    return () => clearError(dispatch)
  }, [])

  if (error) return <NothingWasFetched />

  if (!allCasesList.length && !loading) return <NothingWasFetched />

  return (
    <div>
      <div className='content-section'>
        {allCasesList && !loading ? (
          <ListLength length={allCasesList.length} />
        ) : null}
        {loading ? <Loader /> : <AllCasesList allCases={allCasesList} />}
      </div>
    </div>
  )
}

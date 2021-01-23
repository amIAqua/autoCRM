import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { Loader } from '../../components/Loader/Loader'
import { ListLength } from '../../components/ListLength/ListLength'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'

import { RootAppState } from '../../store'
import { getAllCompletedCases } from '../../store/reducers/caseInProgress_reducer'
import { completedCasesSelector, loadingSelector } from '../../store/selectors'
import { allCasesListType } from '../../store/types/casesReducer.types'

export const CompletedCasesLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const completedCasesList: allCasesListType = useSelector(
    (state: RootAppState) => completedCasesSelector(state)
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCompletedCases())
  }, [])

  if (!completedCasesList.length && !loading) return <NothingWasFetched />

  return (
    <div>
      <div className='content-section'>
        {loading ? null : <ListLength length={completedCasesList.length} />}

        {loading ? <Loader /> : <AllCasesList allCases={completedCasesList} />}
      </div>
    </div>
  )
}

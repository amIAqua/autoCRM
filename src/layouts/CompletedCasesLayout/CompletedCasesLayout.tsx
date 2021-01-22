import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'

import { RootAppState } from '../../store'
import { getAllCompletedCases } from '../../store/reducers/caseInProgress_reducer'
import { completedCasesSelector, loadingSelector } from '../../store/selectors'

export const CompletedCasesLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const completedCasesList = useSelector((state: RootAppState) =>
    completedCasesSelector(state)
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCompletedCases())
  }, [])

  if (!completedCasesList.length) return <NothingWasFetched />

  return (
    <div>
      <div className='container'>
        {loading ? <Loader /> : <AllCasesList allCases={completedCasesList} />}
      </div>
    </div>
  )
}

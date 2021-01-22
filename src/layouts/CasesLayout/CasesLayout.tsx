import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootAppState } from '../../store'
import { getAllCases } from '../../store/reducers/case_Reducer'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { casesSelector, loadingSelector } from '../../store/selectors'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'

export const CasesLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const allCasesList = useSelector((state: RootAppState) =>
    casesSelector(state)
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCases())
  }, [])

  if (!allCasesList.length) return <NothingWasFetched />

  return (
    <div>
      <div className='container'>
        {loading ? <Loader /> : <AllCasesList allCases={allCasesList} />}
      </div>
    </div>
  )
}

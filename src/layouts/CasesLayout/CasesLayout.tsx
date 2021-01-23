import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootAppState } from '../../store'
import { getAllCases } from '../../store/reducers/case_Reducer'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { casesSelector, loadingSelector } from '../../store/selectors'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'
import { allCasesListType } from '../../store/types/casesReducer.types'
import { ListLength } from '../../components/ListLength/ListLength'

export const CasesLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const allCasesList: allCasesListType = useSelector((state: RootAppState) =>
    casesSelector(state)
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCases())
  }, [])

  if (!allCasesList.length && !loading) return <NothingWasFetched />

  return (
    <div>
      <div className='content-section'>
        {loading ? null : <ListLength length={allCasesList.length} />}

        {loading ? <Loader /> : <AllCasesList allCases={allCasesList} />}
      </div>
    </div>
  )
}

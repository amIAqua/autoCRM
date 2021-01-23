import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootAppState } from '../../store'
import { allCasesListType } from '../../store/types/casesReducer.types'
import { casesInProgressSelector, loadingSelector } from '../../store/selectors'
import { Loader } from '../../components/Loader/Loader'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'
import { AllCasesList } from '../../components/AllCasesList/AllCasesList'
import { getAllCases } from '../../store/reducers/case_Reducer'
import { ListLength } from '../../components/ListLength/ListLength'

export const CasesInProgressLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const casesInProgressList: allCasesListType = useSelector(
    (state: RootAppState) => casesInProgressSelector(state)
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllCases())
  }, [])

  if (!casesInProgressList.length && !loading) return <NothingWasFetched />

  return (
    <div>
      <div className='content-section'>
        {loading ? null : <ListLength length={casesInProgressList.length} />}

        {loading ? <Loader /> : <AllCasesList allCases={casesInProgressList} />}
      </div>
    </div>
  )
}

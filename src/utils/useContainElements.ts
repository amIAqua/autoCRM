import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootAppState } from '../store'
import { getAllCompletedCases } from '../store/reducers/completedCase_Reducer'
import { getAllCases } from '../store/reducers/case_Reducer'
import {
  casesInProgressSelector,
  casesSelector,
  completedCasesSelector,
} from '../store/selectors'
import { getAllCasesInProgress } from '../store/reducers/caseInProgress_reducer'

export const useContainElements = () => {
  const dispatch = useDispatch()

  const cases = useSelector((state: RootAppState) => casesSelector(state))
  const inProgress = useSelector((state: RootAppState) =>
    casesInProgressSelector(state)
  )
  const completed = useSelector((state: RootAppState) =>
    completedCasesSelector(state)
  )

  React.useEffect(() => {
    dispatch(getAllCases())
    dispatch(getAllCasesInProgress())
    dispatch(getAllCompletedCases())
  }, [])

  return { cases, inProgress, completed }
}

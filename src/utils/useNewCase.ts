import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootAppState } from '../store'
import { addNewCase } from '../store/reducers/case_Reducer'
import { errorsSelector } from '../store/selectors'
import { caseType } from '../store/types/casesReducer.types'
import { useMessages } from './useMessages'

export const useNewCase = () => {
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const { successMessage, errorMessage } = useMessages()
  const history = useHistory()
  const dispatch = useDispatch()

  const addNewCaseHandler = async (values: caseType) => {
    await dispatch(addNewCase(values))
  }

  React.useEffect(() => {
    // TODO: set errors
  }, [error])

  return { addNewCaseHandler }
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { match } from 'react-router-dom'
import { currentCaseSelector } from '../../store/selectors'
import { checkCurrentCaseStatus } from '../../utils/helpers'
import { RootAppState } from '../../store'
import { EditCurrentCaseForm } from '../../components/EditCurrentCaseForm/EditCurrentCaseForm'
import { getCaseDetails } from '../../store/reducers/case_Reducer'

type queryParams = {
  _id: string
}

type Props = {
  match: match<queryParams>
}

export const EditCaseLayout: React.FC<Props> = ({ match }) => {
  const currentEditedCase = useSelector((state: RootAppState) =>
    currentCaseSelector(state)
  )
  const dispatch = useDispatch()

  // getting params _id
  const _id = match.params._id

  useEffect(() => {
    if (checkCurrentCaseStatus(currentEditedCase._id!, _id)) return
    dispatch(getCaseDetails(_id))
  }, [])

  return (
    <div className='container'>
      {currentEditedCase._id ? (
        <EditCurrentCaseForm currentCase={currentEditedCase} />
      ) : null}
    </div>
  )
}

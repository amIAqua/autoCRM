import React from 'react'
import { match, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DetailCaseCard } from '../../components/DetailCaseCard/DetailCaseCard'
import { RootAppState } from '../../store'
import { deleteCase, getCaseDetails } from '../../store/reducers/case_Reducer'
import { Loader } from '../../components/Loader/Loader'
import { takeCaseInProgress } from '../../store/reducers/caseInProgress_reducer'
import { completeCase } from '../../store/reducers/completedCase_Reducer'
import { useMessages } from '../../utils/useMessages'
import { clearError, stopLoading } from '../../utils/helpers'
import {
  currentCaseSelector,
  errorsSelector,
  loadingSelector,
} from '../../store/selectors'

type Params = {
  _id: string
}

export const DetailCaseLayout: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const currentCaseDetails = useSelector((state: RootAppState) =>
    currentCaseSelector(state)
  )
  const { successMessage, errorMessage } = useMessages()
  const dispatch = useDispatch()
  const history = useHistory()
  const { _id }: Params = useParams()

  React.useEffect((): any => {
    dispatch(getCaseDetails(_id))
  }, [dispatch, _id])

  React.useEffect(() => {
    if (error) {
      stopLoading(dispatch)
      errorMessage(error.message)
    }
    return () => clearError(dispatch)
  }, [error])

  const returnRoute = (route: string) => history.push(route)

  const returnAndSuccess = (message: string) => {
    return setTimeout(() => {
      returnRoute('/specify')
      successMessage(message)
    }, 500)
  }

  const deleteItemHandler = (_id: string) => {
    dispatch(deleteCase(_id))

    returnAndSuccess('Заявка была удалена успешно')
  }

  const takeInProgressHandler = (_id: string) => {
    dispatch(takeCaseInProgress(_id))

    returnAndSuccess('Заявка переведена в статус выполнения')
  }

  const completeCaseHandler = (_id: string) => {
    dispatch(completeCase(_id))

    returnAndSuccess('Заявка переведена в статус выполненных')
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <DetailCaseCard
          item={currentCaseDetails}
          deleteItemHandler={deleteItemHandler}
          takeInProgressHandler={takeInProgressHandler}
          completeCaseHandler={completeCaseHandler}
        />
      )}
    </div>
  )
}

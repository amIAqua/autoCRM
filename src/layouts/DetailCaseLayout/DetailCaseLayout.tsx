import React from 'react'
import { match, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DetailCaseCard } from '../../components/DetailCaseCard/DetailCaseCard'
import {
  currentCaseSelector,
  errorsSelector,
  loadingSelector,
} from '../../store/selectors'
import { RootAppState } from '../../store'
import { deleteCase, getCaseDetails } from '../../store/reducers/case_Reducer'
import { Loader } from '../../components/Loader/Loader'
import { takeCaseInProgress } from '../../store/reducers/caseInProgress_reducer'
import { completeCase } from '../../store/reducers/completedCase_Reducer'
import { useMessages } from '../../utils/useMessages'
import { clearError, stopLoading } from '../../utils/helpers'
import { NothingWasFetched } from '../../components/NothingWasFetched/NothingWasFetched'

type queryParams = {
  _id: string
}

type Props = {
  match: match<queryParams>
}

export const DetailCaseLayout: React.FC<Props> = ({ match }) => {
  const currentCaseDetails = useSelector((state: RootAppState) =>
    currentCaseSelector(state)
  )
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const { successMessage, errorMessage } = useMessages()

  const dispatch = useDispatch()
  const history = useHistory()

  // getting url caseId params
  const _id = match.params._id

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

  const deleteItemHandler = (_id: string) => {
    dispatch(deleteCase(_id))

    setTimeout(() => {
      returnRoute('/specify')
      successMessage('Заявка была удалена успешно')
    }, 500)
  }

  const takeInProgressHandler = (_id: string) => {
    dispatch(takeCaseInProgress(_id))

    setTimeout(() => {
      returnRoute('/specify')
      successMessage('Заявка переведена в статус выполнения')
    }, 500)
  }

  const completeCaseHandler = (_id: string) => {
    dispatch(completeCase(_id))

    setTimeout(() => {
      returnRoute('/specify')
      successMessage('Заявка переведена в статус выполненных')
    }, 500)
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

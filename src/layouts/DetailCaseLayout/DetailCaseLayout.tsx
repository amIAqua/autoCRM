import React from 'react'
import { match, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DetailCaseCard } from '../../components/DetailCaseCard/DetailCaseCard'
import { currentCaseSelector, loadingSelector } from '../../store/selectors'
import { RootAppState } from '../../store'
import { deleteCase, getCaseDetails } from '../../store/reducers/case_Reducer'
import { Loader } from '../../components/Loader/Loader'
import {
  takeCaseInProgress,
  completeCase,
} from '../../store/reducers/caseInProgress_reducer'
import { useMessages } from '../../utils/useMessages'

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
  const { successMessage } = useMessages()

  const dispatch = useDispatch()
  const history = useHistory()

  // getting url caseId params
  const _id = match.params._id

  React.useEffect((): any => {
    dispatch(getCaseDetails(_id))
  }, [dispatch, _id])

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

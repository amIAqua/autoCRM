import { ThunkAction } from 'redux-thunk'
import { RootAppState } from '../../store'
import { casesInProgressAPI } from '../api/cases-in-progress-api'
import {
  findCaseInListHelper,
  initializeLoading,
  stopLoading,
} from '../../utils/helpers'
import { allCasesListType, caseType } from '../types/casesReducer.types'
import { actions as errorActions } from '../reducers/error_Reducer'
import { ActionsTypes } from '../types/rootActionsType'

export const initialState = {
  allCasesInProgressList: [] as allCasesListType,
  completedCases: [] as allCasesListType,
}

type initialStateType = typeof initialState

// base thunk type
type ThunkType = ThunkAction<Promise<void>, RootAppState, unknown, ActionsTypes>

export const caseInProgressReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/cases/SET_CASES_IN_PROGRESS_LIST':
      return {
        ...state,
        allCasesInProgressList: action.payload,
      }
    case 'acrm/cases/TAKE_CASE_IN_PROGRESS':
      return {
        ...state,
        allCasesInProgressList: [
          ...state.allCasesInProgressList,
          action.payload,
        ],
      }
    default:
      return state
  }
}

export const actions = {
  setAllCasesInProgressList: (casesInProgressList: allCasesListType) =>
    ({
      type: 'acrm/cases/SET_CASES_IN_PROGRESS_LIST',
      payload: casesInProgressList,
    } as const),
  takeCaseInProgress: (progressedCase: caseType) =>
    ({
      type: 'acrm/cases/TAKE_CASE_IN_PROGRESS',
      payload: progressedCase,
    } as const),
}

export const getAllCasesInProgress = (): ThunkType => async (dispatch) => {
  try {
    initializeLoading(dispatch)
    const casesInProgress = await casesInProgressAPI.getAllCasesInProgress()

    dispatch(actions.setAllCasesInProgressList(casesInProgress))

    stopLoading(dispatch)
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось загрузить список выполняемых заявок',
      })
    )
  }
}

export const takeCaseInProgress = (_id: string): ThunkType => async (
  dispatch,
  getState
) => {
  try {
    await casesInProgressAPI.takeCaseInProgress(_id)

    const progressedCase = findCaseInListHelper(
      getState().caseReducer.allCasesList,
      _id
    )
    dispatch(actions.takeCaseInProgress(progressedCase!))
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось перевести заявку в статус выполнения...',
      })
    )
  }
}

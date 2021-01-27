import { ThunkAction } from 'redux-thunk'
import { RootAppState } from '../../store'
import { completedCasesAPI } from '../api/completed-cases.api'
import { initializeLoading, stopLoading } from '../../utils/helpers'
import { allCasesListType, caseType } from '../types/casesReducer.types'
import { actions as errorActions } from '../reducers/error_Reducer'
import { ActionsTypes } from '../types/rootActionsType'

export const initialState = {
  completedCases: [] as allCasesListType,
}

type initialStateType = typeof initialState

// base thunk type
type ThunkType = ThunkAction<Promise<void>, RootAppState, unknown, ActionsTypes>

export const completedCasesReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/completedCases/SET_ALL_COMPLETED_CASES_LIST':
      return {
        ...state,
        completedCases: action.payload,
      }
    case 'acrm/completedCases/COMPLETE_CASE':
      return {
        ...state,
        completedCases: [action.payload.completedCase, ...state.completedCases],
      }
    default:
      return state
  }
}

export const actions = {
  setAllCompletedCasesList: (casesList: allCasesListType) =>
    ({
      type: 'acrm/completedCases/SET_ALL_COMPLETED_CASES_LIST',
      payload: casesList,
    } as const),
  completeCase: (completedCase: caseType, _id: string) =>
    ({
      type: 'acrm/completedCases/COMPLETE_CASE',
      payload: { completedCase, _id },
    } as const),
}

export const completeCase = (_id: string): ThunkType => async (
  dispatch,
  getState
) => {
  try {
    const completedCase = await completedCasesAPI.completeCase(_id)

    dispatch(actions.completeCase(completedCase, _id))
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось выполнить заявку...',
      })
    )
  }
}

export const getAllCompletedCases = (): ThunkType => async (dispatch) => {
  try {
    initializeLoading(dispatch)
    const completedCasesList = await completedCasesAPI.getAllCompletedCases()

    dispatch(actions.setAllCompletedCasesList(completedCasesList))

    stopLoading(dispatch)
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось загрузить список выполненных заявок...',
      })
    )
  }
}

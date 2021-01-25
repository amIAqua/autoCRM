import { ThunkAction } from 'redux-thunk'
import { RootAppState } from '../../store'
import { casesInProgressAPI } from '../api/cases-in-progress-api'
import {
  findCaseInListHelper,
  initializeLoading,
  stopLoading,
} from '../../utils/helpers'
import { allCasesListType, caseType } from '../types/casesReducer.types'
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
    case 'acrm/cases/COMPLETE_CASE':
      return {
        ...state,
        allCasesInProgressList: state.allCasesInProgressList.filter(
          (item: caseType) => item._id !== action.payload._id
        ),
        completedCases: [...state.completedCases, action.payload.completedCase],
      }
    case 'acrm/cases/SET_ALL_COMPLETED_CASES_LIST':
      return {
        ...state,
        completedCases: action.payload,
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
  completeCase: (completedCase: caseType, _id: string) =>
    ({
      type: 'acrm/cases/COMPLETE_CASE',
      payload: { completedCase, _id },
    } as const),
  setAllCompletedCasesList: (completedCases: allCasesListType) =>
    ({
      type: 'acrm/cases/SET_ALL_COMPLETED_CASES_LIST',
      payload: completedCases,
    } as const),
}

export const takeCaseInProgress = (_id: string): ThunkType => async (
  dispatch,
  getState
) => {
  await casesInProgressAPI.takeCaseInProgress(_id)

  const progressedCase = findCaseInListHelper(
    getState().caseReducer.allCasesList,
    _id
  )
  dispatch(actions.takeCaseInProgress(progressedCase!))
}

export const completeCase = (_id: string): ThunkType => async (
  dispatch,
  getState
) => {
  const completedCase = await casesInProgressAPI.completeCase(_id)

  dispatch(actions.completeCase(completedCase, _id))
}

export const getAllCompletedCases = (): ThunkType => async (dispatch) => {
  initializeLoading(dispatch)
  const completedCasesList = await casesInProgressAPI.getAllCompletedCases()

  dispatch(actions.setAllCompletedCasesList(completedCasesList))

  stopLoading(dispatch)
}

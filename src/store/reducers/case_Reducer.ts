import { caseType, allCasesListType } from '../types/casesReducer.types'
import { caseAPI } from '../api/cases-api'
import { RootAppState } from '../../store'
import { ActionsTypes } from '../types/rootActionsType'
import { ThunkAction } from 'redux-thunk'
import {
  initializeLoading,
  stopLoading,
  separateCases,
} from '../../utils/helpers'
import { actions as caseInProgressActions } from '../reducers/caseInProgress_reducer'
import { actions as errorActions } from '../reducers/error_Reducer'

export const initialState = {
  newCase: {
    ownerInfo: {
      name: '',
      surname: '',
      adress: '',
      contacts: {
        email: '',
        phoneNumber: '',
      },
    },
    autoInfo: {
      brand: '',
      model: '',
      year: '',
      bodyNumber: '',
      engine: {
        volume: '',
        specification: '',
      },
    },
    problems: '',
    result: '',
    navigation: {
      createdDate: '',
      completedDate: '',
      worker: '',
    },
    _id: '',
    inProgress: false,
    completed: false,
  } as caseType,
  allCasesList: [] as allCasesListType,
}

type initialStateType = typeof initialState

// base thunk type
type ThunkType = ThunkAction<Promise<void>, RootAppState, unknown, ActionsTypes>

export const caseReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/cases/SET_ALL_CASES_LIST':
      return {
        ...state,
        allCasesList: action.payload,
      }
    case 'acrm/cases/SET_CURRENT_CASE':
      return {
        ...state,
        newCase: action.payload,
      }
    case 'acrm/cases/CLEAR_CURRENT_CASE':
      return {
        ...state,
        newCase: initialState.newCase,
      }
    case 'acrm/cases/DELETE_CASE':
      return {
        ...state,
        allCasesList: state.allCasesList.filter(
          (item) => item._id !== action.payload
        ),
      }

    default:
      return state
  }
}

// Action creators
export const actions = {
  setAllCasesList: (allCasesList: allCasesListType) =>
    ({
      type: 'acrm/cases/SET_ALL_CASES_LIST',
      payload: allCasesList,
    } as const),
  setCurrentCase: (currentCase: caseType) =>
    ({
      type: 'acrm/cases/SET_CURRENT_CASE',
      payload: currentCase,
    } as const),
  clearCurrentCase: () =>
    ({
      type: 'acrm/cases/CLEAR_CURRENT_CASE',
    } as const),
  deleteCase: (_id: string) =>
    ({
      type: 'acrm/cases/DELETE_CASE',
      payload: _id,
    } as const),
}

// Thunk creators
export const addNewCase = (newCase: caseType): ThunkType => async (
  dispatch
) => {
  try {
    await caseAPI.addCase(newCase)
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Что-то пошло не так...',
      })
    )
  }
}

export const getAllCases = (): ThunkType => async (dispatch) => {
  try {
    initializeLoading(dispatch)
    const allCasesList: allCasesListType = await caseAPI.getAllCases()

    dispatch(actions.setAllCasesList(allCasesList))

    stopLoading(dispatch)
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось загрузить список заявок...',
      })
    )
  }
}

export const getCaseDetails = (_id: string): ThunkType => async (dispatch) => {
  try {
    initializeLoading(dispatch)

    const currentCase = await caseAPI.getCurrentCase(_id)

    dispatch(actions.setCurrentCase(currentCase!))

    stopLoading(dispatch)
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось загрузить детали заявки...',
      })
    )
  }
}

export const editCurrentCase = (
  editedCase: caseType,
  _id: string
): ThunkType => async (dispatch) => {
  try {
    initializeLoading(dispatch)

    const savedEditedCase = await caseAPI.editCurrentCase(editedCase, _id)

    stopLoading(dispatch)

    dispatch(actions.setCurrentCase(savedEditedCase))
    dispatch(getCaseDetails(_id))
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось редактировать заявку...',
      })
    )
  }
}

export const deleteCase = (_id: string): ThunkType => async (dispatch) => {
  try {
    await caseAPI.deleteCase(_id)

    dispatch(actions.deleteCase(_id))
  } catch (error) {
    dispatch(
      errorActions.setError({
        code: 1,
        message: 'Не удалось удалить заявку...',
      })
    )
  }
}

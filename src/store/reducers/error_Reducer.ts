import { ThunkAction } from 'redux-thunk'
import { ActionsTypes } from '../types/rootActionsType'
import { RootAppState } from '../../store'
import { errorType } from '../types/errorReducer.types'

const initialState = {
  error: null as errorType,
}

type initialStateType = typeof initialState

// base thunk type
type ThunkType = ThunkAction<Promise<void>, RootAppState, unknown, ActionsTypes>

export const errorReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/errors/SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'acrm/errors/CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const actions = {
  setError: (error: errorType) =>
    ({
      type: 'acrm/errors/SET_ERROR',
      payload: error,
    } as const),
  clearError: () =>
    ({
      type: 'acrm/errors/CLEAR_ERROR',
    } as const),
}

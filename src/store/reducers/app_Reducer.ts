import { ActionsTypes } from '../types/rootActionsType'

const initialState = {
  isLoading: false as boolean,
  isFetching: false,
}

type initialStateType = typeof initialState

export const appReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/loading/SET_LOADING_STATUS':
      return {
        ...state,
        isLoading: true,
      }
    case 'acrm/loading/REMOVE_LOADING_STATUS':
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export const actions = {
  setLoadingStatus: () =>
    ({
      type: 'acrm/loading/SET_LOADING_STATUS',
    } as const),
  removeLoadingStatus: () =>
    ({
      type: 'acrm/loading/REMOVE_LOADING_STATUS',
    } as const),
}

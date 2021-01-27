import { priceListItemType, pricesListType } from '../types/pricesReducer.types'
import { ActionsTypes } from '../types/rootActionsType'

const initialState = {
  priceListItem: {
    text: '',
    price: '',
  } as priceListItemType,
  pricesList: [] as pricesListType,
}

type initialStateType = typeof initialState

export const pricesReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'acrm/prices/SET_ALL_PRICES_LIST':
      return {
        ...state,
        pricesList: action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  setAllPricesList: (allPricesList: pricesListType) =>
    ({
      type: 'acrm/prices/SET_ALL_PRICES_LIST',
      payload: allPricesList,
    } as const),
}

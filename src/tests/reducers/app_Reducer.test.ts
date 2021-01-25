import {
  appReducer,
  initialState,
  actions,
} from '../../store/reducers/app_Reducer'

describe('app educer', () => {
  it('reducer returns initial state', () => {
    //@ts-ignore
    const newState = appReducer(undefined, {})
    expect(newState).toEqual(initialState)
  })
})

describe('app reducer actions work correctly', () => {
  it('setLoadingStatus', () => {
    const expectedAction = {
      type: 'acrm/loading/SET_LOADING_STATUS',
    }
    expect(actions.setLoadingStatus()).toEqual(expectedAction)
  })

  it('removeLoadingStatus', () => {
    const expectedAction = {
      type: 'acrm/loading/REMOVE_LOADING_STATUS',
    }
    expect(actions.removeLoadingStatus()).toEqual(expectedAction)
  })
})

export {}

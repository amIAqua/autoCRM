import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import {
  actions,
  caseReducer,
  getAllCases,
} from '../../store/reducers/case_Reducer'
import {
  allCasesListType,
  caseType,
} from '../../store/types/casesReducer.types'
import { mockInitialState, mockReturnedCasesList } from './mockData'

let currentCase: caseType = {
  ownerInfo: {
    name: 'Boo',
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
  _id: '321',
  inProgress: false,
  completed: false,
}

describe('caseReducer', () => {
  it('reducer returns initial state', () => {
    // @ts-ignore
    const newState = caseReducer(undefined, {})
    expect(newState).toEqual(initialState)
  })
})

describe('case reducer actions work correctly', () => {
  it('setAllCasesList', () => {
    const allCaseList: allCasesListType = []
    const expectedAction = {
      type: 'acrm/cases/SET_ALL_CASES_LIST',
      payload: allCaseList,
    }
    expect(actions.setAllCasesList(allCaseList)).toEqual(expectedAction)
  })

  it('setCurrentCase', () => {
    const expectedAction = {
      type: 'acrm/cases/SET_CURRENT_CASE',
      payload: currentCase,
    }
    expect(actions.setCurrentCase(currentCase)).toEqual(expectedAction)
  })

  it('clearCurrentCase', () => {
    const expectedAction = {
      type: 'acrm/cases/CLEAR_CURRENT_CASE',
    }
    expect(actions.clearCurrentCase()).toEqual(expectedAction)
  })

  it('deleteCase', () => {
    const _id: string = '123'
    const expectedAction = {
      type: 'acrm/cases/DELETE_CASE',
      payload: _id,
    }
    expect(actions.deleteCase(_id)).toEqual(expectedAction)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initialState = mockInitialState

export {}

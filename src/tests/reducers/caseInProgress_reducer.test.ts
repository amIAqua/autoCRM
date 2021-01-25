import {
  caseInProgressReducer,
  initialState,
  actions,
} from '../../store/reducers/caseInProgress_reducer'
import {
  allCasesListType,
  caseType,
} from '../../store/types/casesReducer.types'

describe('caseInProgress reducer', () => {
  it('reducer returns initial state', () => {
    // @ts-ignore
    const newState = caseInProgressReducer(undefined, {})
    expect(newState).toEqual(initialState)
  })
})

describe('case reducer actions work correctly', () => {
  let completedCase: caseType = {
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
  }

  it('setAllCasesInProgressList', () => {
    const allCasesInProgressList: allCasesListType = []
    const expectedAction = {
      type: 'acrm/cases/SET_CASES_IN_PROGRESS_LIST',
      payload: allCasesInProgressList,
    }
    expect(actions.setAllCasesInProgressList(allCasesInProgressList)).toEqual(
      expectedAction
    )
  })

  it('setAllCompletedCasesList', () => {
    const getAllCompletedCases: allCasesListType = []
    const expectedAction = {
      type: 'acrm/cases/SET_ALL_COMPLETED_CASES_LIST',
      payload: getAllCompletedCases,
    }
    expect(actions.setAllCompletedCasesList(getAllCompletedCases)).toEqual(
      expectedAction
    )
  })

  it('takeCaseInProgress', () => {
    const expectedAction = {
      type: 'acrm/cases/TAKE_CASE_IN_PROGRESS',
      payload: completedCase,
    }
    expect(actions.takeCaseInProgress(completedCase)).toEqual(expectedAction)
  })

  it('completeCase', () => {
    const _id = ''
    const expectedAction = {
      type: 'acrm/cases/COMPLETE_CASE',
      payload: { completedCase, _id },
    }

    expect(actions.completeCase(completedCase, _id)).toEqual(expectedAction)
  })
})

export {}

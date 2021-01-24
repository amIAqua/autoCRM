import { Dispatch } from 'react'
import { act } from 'react-dom/test-utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootAppState } from '../store'
import { loadingSelector } from '../store/selectors'
import { allCasesListType, caseType } from '../store/types/casesReducer.types'
import {
  findCaseInListHelper,
  getDate,
  initializeLoading,
  separateCases,
} from '../utils/helpers'
import { getFullName } from '../utils/name_utils'

describe('helper functions tests', () => {
  let casesList: allCasesListType
  let casesInProgressList: allCasesListType
  let notProgressedCasesList: allCasesListType

  beforeEach(() => {
    casesList = [
      {
        ownerInfo: {
          name: 'Foo',
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
        _id: '123',
        inProgress: true,
        completed: false,
      },
      {
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
      },
    ]

    casesInProgressList = [
      {
        ownerInfo: {
          name: 'Foo',
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
        _id: '123',
        inProgress: true,
        completed: false,
      },
    ]
    notProgressedCasesList = [
      {
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
      },
    ]
  })

  describe('findCaseInListHelper', () => {
    let expectedCase: caseType

    beforeEach(() => {
      expectedCase = {
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
    })

    it('should be defined', () => {
      expect(findCaseInListHelper).toBeDefined()
    })

    it('should return correct value', () => {
      expect(findCaseInListHelper(casesList, '321')).toEqual(expectedCase)
    })
  })

  describe('getDate', () => {
    it('should be defined', () => {
      expect(getDate).toBeDefined()
    })

    it('should return correct date', () => {
      expect(getDate()).toBe(new Date().toLocaleDateString())
    })
  })

  describe('separateCases', () => {
    it('should be defined', () => {
      expect(separateCases).toBeDefined()
    })

    it('should return correct arrays of cases', () => {
      expect(separateCases(casesList)).toEqual({
        casesInProgressList,
        notProgressedCasesList,
      })
    })
  })

  describe('getFullName', () => {
    it('should be defined', () => {
      expect(getFullName).toBeDefined()
    })

    it('should return correct value', () => {
      expect(getFullName('Foo', 'Boo')).toEqual('Foo Boo')
    })
  })
})

export {}

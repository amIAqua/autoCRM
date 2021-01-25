import { useContainElements } from '../utils/useContainElements'
import { useMessages } from '../utils/useMessages'
import { renderHook } from '@testing-library/react-hooks'
import { store } from '../store'
import { Provider } from 'react-redux'

describe('useContainElements', () => {
  let globalResult: any

  beforeEach(() => {
    const { result } = renderHook(() => useContainElements(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    })
    globalResult = result
  })
  it('should be defined', () => {
    expect(useContainElements).toBeDefined()
  })

  it('all cases list should be defined', () => {
    expect(globalResult.current.cases).toBeDefined()
  })

  it('should return all cases equal to store value', () => {
    expect(globalResult.current.cases).toEqual(
      store.getState().caseReducer.allCasesList
    )
  })

  it('cases in progress list should be defined', () => {
    expect(globalResult.current.inProgress).toBeDefined()
  })

  it('should return cases in progress list equal to store value', () => {
    expect(globalResult.current.inProgress).toEqual(
      store.getState().caseInProgressReducer.allCasesInProgressList
    )
  })

  it('completed cases list should be defined', () => {
    expect(globalResult.current.completed).toBeDefined()
  })

  it('completed cases list equal to store value', () => {
    expect(globalResult.current.inProgress).toEqual(
      store.getState().caseInProgressReducer.completedCases
    )
  })
})

describe('useMessages', () => {
  it('should be defined', () => {
    expect(useMessages).toBeDefined()
  })

  it('hook methods should be defined', () => {
    const { result } = renderHook(() => useMessages())

    expect(result.current.successMessage).toBeDefined()
    expect(result.current.warningMessage).toBeDefined()
    expect(result.current.errorMessage).toBeDefined()
  })
})

export {}

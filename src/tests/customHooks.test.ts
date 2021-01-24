import { allCasesListType } from '../store/types/casesReducer.types'
import { useContainElements } from '../utils/useContainElements'
import { useMessages } from '../utils/useMessages'

describe('useContainElements', () => {
  let cases: allCasesListType = []
  let inProgress: allCasesListType = []
  let completed: allCasesListType = []

  it('should be defined', () => {
    expect(useContainElements).toBeDefined()
  })

  it('should return correct values', () => {})
})

describe('useMessages', () => {
  it('should be defined', () => {
    expect(useMessages).toBeDefined()
  })

  it('should return correct values', () => {})
})

export {}

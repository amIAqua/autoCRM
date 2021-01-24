import { renderHook } from '@testing-library/react-hooks'
import { useContainElements } from '../utils/useContainElements'
import { useMessages } from '../utils/useMessages'

describe('useContainElements', () => {
  it('should be defined', () => {
    expect(useContainElements).toBeDefined()
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

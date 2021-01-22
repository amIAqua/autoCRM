import { RootAppState } from '../store'

const caseSelector = (state: RootAppState) => state.caseReducer
const appSelector = (state: RootAppState) => state.appReducer
const caseInProgressSelector = (state: RootAppState) =>
  state.caseInProgressReducer

// cases selectors
export const casesSelector = (state: RootAppState) =>
  caseSelector(state).allCasesList

export const currentCaseSelector = (state: RootAppState) =>
  caseSelector(state).newCase

// cases in progress selectors
export const casesInProgressSelector = (state: RootAppState) =>
  caseInProgressSelector(state).allCasesInProgressList

// completed cases selectors
export const completedCasesSelector = (state: RootAppState) =>
  caseInProgressSelector(state).completedCases

// loading selector
export const loadingSelector = (state: RootAppState) =>
  appSelector(state).isLoading

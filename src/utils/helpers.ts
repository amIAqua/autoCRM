import { Dispatch } from 'react'
import { Action } from 'redux'
import { actions as appActions } from '../store/reducers/app_Reducer'
import { actions as errorActions } from '../store/reducers/error_Reducer'

import { allCasesListType, caseType } from '../store/types/casesReducer.types'

export const checkCurrentCaseStatus = (currentCaseId: string, _id: string) =>
  currentCaseId === _id

// dispatch returner
export const initializeLoading = (dispatch: Dispatch<Action>) =>
  dispatch(appActions.setLoadingStatus())

export const stopLoading = (dispatch: Dispatch<Action>) =>
  dispatch(appActions.removeLoadingStatus())

export const clearError = (dispatch: Dispatch<Action>) =>
  dispatch(errorActions.clearError())

// cases in progress helpers
export const findCaseInListHelper = (
  allCasesInProgress: allCasesListType,
  _id: string
) => {
  let resultCase = allCasesInProgress.find((item: caseType) => item._id === _id)
  return resultCase
}

export const separateCases = (allCasesList: allCasesListType) => {
  const casesInProgressList: allCasesListType = []
  const notProgressedCasesList: allCasesListType = []
  const completedCases: allCasesListType = []

  allCasesList.map((item: caseType) => {
    if (item.inProgress && !item.completed) {
      casesInProgressList.push(item)
    }

    if (!item.completed && !item.inProgress) {
      notProgressedCasesList.push(item)
    }

    if (item.completed && !item.inProgress) {
      completedCases.push(item)
    }
  })

  return { casesInProgressList, notProgressedCasesList, completedCases }
}

// date generator

export const getDate = () => new Date().toLocaleDateString()

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}

export const dateFormatter = (date: Date) =>
  `${date.toLocaleString('en-US', options)}`

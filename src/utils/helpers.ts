import { Dispatch } from 'react'
import { Action } from 'redux'
import { actions as appActions } from '../store/reducers/app_Reducer'
import { allCasesListType, caseType } from '../store/types/casesReducer.types'

export const checkCurrentCaseStatus = (
  currentUserId: string,
  paramsId: string
): boolean => currentUserId === paramsId

// dispatch returner
export const initializeLoading = (dispatch: Dispatch<Action>) =>
  dispatch(appActions.setLoadingStatus())

export const stopLoading = (dispatch: Dispatch<Action>) =>
  dispatch(appActions.removeLoadingStatus())

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

  allCasesList.map((item: caseType) => {
    if (item.inProgress && !item.completed) {
      casesInProgressList.push(item)
    }

    if (!item.completed && !item.inProgress) {
      notProgressedCasesList.push(item)
    }
  })

  return { casesInProgressList, notProgressedCasesList }
}

// date generator

export const getDate = () => new Date().toLocaleDateString()

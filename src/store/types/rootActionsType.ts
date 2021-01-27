import { actions as caseActions } from '../reducers/case_Reducer'
import { actions as appActions } from '../reducers/app_Reducer'
import { actions as errorActions } from '../reducers/error_Reducer'
import { actions as caseInProgressActions } from '../reducers/caseInProgress_reducer'
import { actions as completedCaseActions } from '../reducers/completedCase_Reducer'
import { actions as pricesActions } from '../reducers/prices_Reducer'
import { InferActionsTypes } from '../../store'

export const rootActions = {
  ...appActions,
  ...caseActions,
  ...caseInProgressActions,
  ...completedCaseActions,
  ...errorActions,
  ...pricesActions,
}
// auto inferred action types for root actions types
export type ActionsTypes = InferActionsTypes<typeof rootActions>

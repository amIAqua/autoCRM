import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { caseReducer } from './store/reducers/case_Reducer'
import { appReducer } from './store/reducers/app_Reducer'
import { caseInProgressReducer } from './store/reducers/caseInProgress_reducer'

const rootReducer = combineReducers({
  caseReducer,
  appReducer,
  caseInProgressReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types of RootState
export type RootAppState = ReturnType<typeof rootReducer>

// infer actions types
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>

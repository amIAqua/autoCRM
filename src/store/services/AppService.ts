import { observable, action, makeObservable } from 'mobx'

export class AppService {
  _loading = false

  constructor() {
    makeObservable(this, {
      _loading: observable,
      setLoadingTrue: action,
      setLoadingFalse: action,
    })
  }

  // field getters
  get loading() {
    return this._loading
  }

  // actions
  setLoadingTrue() {
    this._loading = true
  }

  setLoadingFalse() {
    this._loading = false
  }
}

export const appService = new AppService()

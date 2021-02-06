import { makeObservable, observable, action } from 'mobx'
import { authAPI } from '../api/auth-api'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { tokenToString } from 'typescript'

class AuthenticationService {
  _isAuthenticated: boolean = false
  _acrmvaltoken: string | null = null

  constructor() {
    makeObservable(this, {
      _isAuthenticated: observable,
      setAuthenticationStatus: action,
      authenticate: action,
      setToken: action,
    })
  }

  // field getters
  get authenticationStatus() {
    return this._isAuthenticated
  }

  // actions

  setAuthenticationStatus() {
    this._isAuthenticated = true
  }

  authenticationStatusFalse() {
    this._isAuthenticated = false
  }

  setToken(token: string) {
    Cookies.set('acrmvaltoken', token)
  }

  clearToken() {
    Cookies.remove('acrmvaltoken')
  }

  async authenticate(userId: string, password: string) {
    try {
      const acrmvaltoken = await authAPI.login(userId, password)

      if (acrmvaltoken) {
        this.setToken(acrmvaltoken)
        this.setAuthenticationStatus()
      }
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      this.clearToken()
      this.authenticationStatusFalse()
    } catch (error) {}
  }

  async verifyAuthentication() {
    const acrmvaltoken = Cookies.get('acrmvaltoken')
    let token: any

    if (!acrmvaltoken) {
      this.authenticationStatusFalse()
      return
    }

    try {
      token = jwt.verify(acrmvaltoken!, 'acrmsecretkey')

      if (token) {
        this.setAuthenticationStatus()
      }
    } catch (TokenExpiredError) {
      Cookies.remove('acrmvaltoken')
      this.authenticationStatusFalse()
    }
  }
}

export const authService = new AuthenticationService()

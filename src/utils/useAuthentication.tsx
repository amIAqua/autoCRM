import { useHistory } from 'react-router-dom'
import { authService } from '../store/services/AuthenticationService'

export const useAuthentication = () => {
  const history = useHistory()

  const redirect = (path: string) => history.push(path)

  const verification = async () => {
    await authService.verifyAuthentication()

    redirect('/specify')
  }

  const login = async (userId: string, password: string) => {
    await authService.authenticate(userId, password)

    redirect('/specify')
  }

  const logout = async () => {
    await authService.logout()

    redirect('/auth')
  }

  return { login, logout, verification }
}

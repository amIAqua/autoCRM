import { FC } from 'react'
import { observer } from 'mobx-react'
import { authService } from '../store/services/AuthenticationService'
import { Redirect, Route } from 'react-router-dom'

type Props = {
  component: any
  path: string
  exact?: boolean
}

export const ProtectedRoute: FC<Props> = observer(
  ({ component, path, exact }) => {
    return (
      <>
        {authService.authenticationStatus ? (
          <Route component={component} path={path} exact />
        ) : (
          <Redirect to={{ pathname: '/auth' }} />
        )}
      </>
    )
  }
)

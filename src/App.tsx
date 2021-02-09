import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { ProtectedRoute } from './utils/ProtectedRoute'

//components
import { SpecifyLayout } from './layouts/SpecifyLayout/SpecifyLayout'
import { NewClientLayout } from './layouts/NewClientLayout/NewClientLayout'
import { CasesLayout } from './layouts/CasesLayout/CasesLayout'
import { DetailCaseLayout } from './layouts/DetailCaseLayout/DetailCaseLayout'
import { EditCaseLayout } from './layouts/EditCaseLayout/EditCaseLayout'
import { CasesInProgressLayout } from './layouts/CasesInProgress/CasesInProgressLayout'
import { CompletedCasesLayout } from './layouts/CompletedCasesLayout/CompletedCasesLayout'
import { Navbar } from './components/Navbar/Navbar'
import { Loader } from './components/Loader/Loader'
import { useSelector } from 'react-redux'
import { RootAppState } from './store'
import { loadingSelector } from './store/selectors'
import { PricesLayout } from './layouts/PricesLayout/PricesLayout'
import { CostsLayout } from './layouts/CostsLayout/CostsLayout'
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'
import { useAuthentication } from './utils/useAuthentication'
import { SideMenu } from './components/SideMenu/SideMenu'

export const App: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const { verification } = useAuthentication()
  const location = useLocation()

  useEffect(() => {
    verification()
  }, [])

  return (
    <div className='main-layout' style={{ display: 'flex' }}>
      {/* <Navbar /> */}
      <SideMenu />

      {loading && location.pathname === '/specify' ? <Loader /> : null}
      <div className='Router container'>
        <Switch>
          <Route component={AuthLayout} path='/auth' exact></Route>
          <ProtectedRoute component={SpecifyLayout} path='/specify' exact />
          <ProtectedRoute component={NewClientLayout} path='/new' />
          <ProtectedRoute component={CasesLayout} path='/cases' exact />
          <ProtectedRoute
            component={DetailCaseLayout}
            path='/cases/:_id'
            exact
          />
          <ProtectedRoute
            component={EditCaseLayout}
            path='/cases/edit/:_id'
            exact
          />
          <ProtectedRoute
            component={CasesInProgressLayout}
            path='/inprogress'
            exact
          />
          <ProtectedRoute
            component={CompletedCasesLayout}
            path='/completed'
            exact
          />

          <ProtectedRoute component={PricesLayout} path='/prices' exact />
          <ProtectedRoute component={CostsLayout} path='/costs/:_id' exact />
        </Switch>
      </div>
    </div>
  )
}

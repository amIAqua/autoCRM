import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

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

export const App: React.FC = () => {
  const loading = useSelector((state: RootAppState) => loadingSelector(state))
  const location = useLocation()

  return (
    <div className='main-layout'>
      <Navbar />
      {loading && location.pathname === '/specify' ? <Loader /> : null}
      <div className='Router container'>
        <Switch>
          <Route component={SpecifyLayout} path='/specify' exact />
          <Route component={NewClientLayout} path='/new' />
          <Route component={CasesLayout} path='/cases' exact />
          <Route component={DetailCaseLayout} path='/cases/:_id' exact />
          <Route component={EditCaseLayout} path='/cases/edit/:_id' exact />
          <Route component={CasesInProgressLayout} path='/inprogress' exact />
          <Route component={CompletedCasesLayout} path='/completed' exact />

          <Route component={PricesLayout} path='/prices' exact />
          <Route component={CostsLayout} path='/costs/:_id' exact />
        </Switch>
      </div>
    </div>
  )
}

import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import { SpecifyLayout } from './layouts/SpecifyLayout/SpecifyLayout'
import { NewClientLayout } from './layouts/NewClientLayout/NewClientLayout'
import { CasesLayout } from './layouts/CasesLayout/CasesLayout'
import { DetailCaseLayout } from './layouts/DetailCaseLayout/DetailCaseLayout'
import { EditCaseLayout } from './layouts/EditCaseLayout/EditCaseLayout'
import { CasesInProgressLayout } from './layouts/CasesInProgress/CasesInProgressLayout'
import { CompletedCasesLayout } from './layouts/CompletedCasesLayout/CompletedCasesLayout'
import { Navbar } from './components/Navbar/Navbar'

export const App: React.FC = () => {
  return (
    <div className='main-layout'>
      <Navbar />
      <div className='Router'>
        <Switch>
          <Route component={SpecifyLayout} path='/specify' exact />
          <Route component={NewClientLayout} path='/new' />
          <Route component={CasesLayout} path='/cases' exact />
          <Route component={DetailCaseLayout} path='/cases/:_id' exact />
          <Route component={EditCaseLayout} path='/cases/edit/:_id' exact />
          <Route component={CasesInProgressLayout} path='/inprogress' exact />
          <Route component={CompletedCasesLayout} path='/completed' exact />
        </Switch>
      </div>
    </div>
  )
}

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import ExceptionPage from '../pages/ExeptionPage'

const Routes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/not-found">
          <ExceptionPage code={404} />
        </Route>
        <Route>
          <AppLayout>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
          </AppLayout>
        </Route>
        <Route path="*">
          <Redirect to="/not-found" />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes

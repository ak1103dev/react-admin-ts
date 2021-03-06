import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import AppLayout from '../layouts/AppLayout'
import LoginPage from '../pages/LoginPage'
import LogoutPage from '../pages/LogoutPage'
import DashboardPage from '../pages/DashboardPage'
import ExceptionPage from '../pages/ExeptionPage'

const Routes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        </Route>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/not-found">
          <ExceptionPage code={404} />
        </Route>
        <Route path={['/dashboard']}>
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

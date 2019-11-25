import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import authConfig from '../config/auth';
import Login from '~/pages/Login';
import Evaluations from '~/pages/Evaluations';
import Employees from '~/pages/Employees';
import Evaluate from '~/pages/Evaluate';
import { isAuthenticated } from '~/util/auth';

export const isAcceptedRole = desiredRole =>
  parseInt(localStorage.getItem(authConfig.ROLE_KEY), 10) === desiredRole;

const PrivateRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() && isAcceptedRole(role) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute
        path="/evaluations"
        role={authConfig.roles.ADMIN}
        component={Evaluations}
      />
      <PrivateRoute
        path="/employees"
        role={authConfig.roles.ADMIN}
        component={Employees}
      />
      <PrivateRoute
        path="/evaluate"
        role={authConfig.roles.EMPLOYEE}
        component={Evaluate}
      />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { NAVIGATION } from './constants';

import Theme from './containers/Theme';
import App from './containers/App';
import Home from './containers/Home';
import Configuration from './containers/Configuration';
import Dashboard from './containers/Dashboard';
import Projects from './containers/Projects';
import History from './containers/History';

export const routes = (
  <Route component={Theme}>
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
      <Route path={NAVIGATION.CONFIG   } component={Configuration} />
      <Route path={NAVIGATION.DASHBOARD} component={Dashboard} />
      <Route path={NAVIGATION.PROJECTS } component={Projects} />
      <Route path={NAVIGATION.HISTORY  } component={History} />
    </Route>
  </Route>
);
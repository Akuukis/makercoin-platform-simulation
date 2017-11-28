import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { hashHistory, Router } from 'react-router';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {RouterStore, TimeStore, ConfigStore, CaseStore} from './stores/';
import {STORE} from './constants/';

import {routes} from './routes';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const routerStore = new RouterStore(hashHistory);
const timeStore = new TimeStore();
const configStore = new ConfigStore();
const caseStore = new CaseStore(timeStore, configStore);
const rootStores = {
  [STORE.ROUTER]: routerStore,
  [STORE.TIME]: timeStore,
  [STORE.CONFIG]: configStore,
  [STORE.CASE]: caseStore,
};

injectTapEventPlugin();
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={hashHistory} >
      { routes }
    </Router>
  </Provider >,
  document.getElementById('root')
);
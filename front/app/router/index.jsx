import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Test from 'Test';

export default (
  <HashRouter basename="/">
    <Switch>
      <Route path="/" component={Test}/>
    </Switch>
  </HashRouter>
);

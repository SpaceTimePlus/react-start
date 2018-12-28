import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from '../pages/page';
import Page2 from '../pages/page2';

import NotFound from '../pages/notFound';

const Main = () => (
  <Switch>
    <Route exact path="/page" component={Page} />
    <Route exact path="/page2" component={Page2} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;

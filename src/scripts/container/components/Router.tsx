import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Top from '~/pages/Top';
import Page1 from '~/pages/Page1';

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Top />
        </Route>
        <Route path="/page1" exact>
          <Page1 />
        </Route>
      </Switch>
    </HashRouter>
  )
};

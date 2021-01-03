import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Top from '~/pages/Top';
import Page1 from '~/pages/Page1';
import Room from '~/pages/Room';

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
        <Route path="/room/:roomId" exact>
          <Room />
        </Route>
      </Switch>
    </HashRouter>
  );
};

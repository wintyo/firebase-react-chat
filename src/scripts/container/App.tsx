import React from 'react';
import { hot } from 'react-hot-loader';

import Router from './components/Router';

const App = () => {
  return (
    <div>
      <Router />
    </div>
  );
};

export default hot(module)(App);

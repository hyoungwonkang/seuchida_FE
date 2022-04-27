import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

import Login from '../pages/LoginPages/Login';
import Redirect from './Redirect';

function App() {
  return (
    <div className='App'>
      <ConnectedRouter history={history}>
        <Route path='/login' exact component={Login} />
        <Route paht='/oauth/callback/kakao' component={Redirect} />
      </ConnectedRouter>
    </div>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

import Login from '../pages/LoginPages/Login';
import Redirect from './Redirect';
import SignupDone from '../pages/LoginPages/SignupDone';

function App() {
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <Route path='/login' exact component={Login} />
          <Route paht='/oauth/callback/kakao' component={Redirect} />
          <Route path='/signupdone' exact component={SignupDone} />
        </ConnectedRouter>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: white;
  min-height: 100vh;
`;

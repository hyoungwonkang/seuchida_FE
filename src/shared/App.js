import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Main from "../pages/Main";
import PostList from "../pages/PostList";
import PostDetail from '../pages/PostDetail'
import Map from "../pages/Map";
import { history } from "../redux/configStore";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <>
  <Container>
        <ConnectedRouter history={history}>
          <Route exact path="/Main" component={Main} />
          <Route exact path="/PostList" component={PostList} />
          <Route exact path="/PostDetail" component={PostDetail} />
          <Route exact path="/Mypage" component={MyPage} />
          <Route exact path="/Map" component={Map} />
        </ConnectedRouter>
   </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 100vh;`
  

import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import Login from "../pages/LoginPages/Login";
import Main from "../pages/Main";
import Redirect from "./Redirect";
import SignupDone from "../pages/LoginPages/SignupDone";
import SignupLoca from "../pages/LoginPages/SignupLoca";
import AddProfile from "../pages/LoginPages/AddProfile";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import Map from "../pages/Map";
import MyPage from "../pages/MyPage";
import FooterMenu from "../shared/FooterMenu";
import Category from "../pages/LoginPages/Category";
import Time from "../components/Time";
import Done from "../pages/LoginPages/Done";

function App() {
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Login} />
          <Route path="/main" exact component={Main} />
          <Route path="/oauth/callback/kakao" component={Redirect} />
          <Route path="/signupdone" exact component={SignupDone} />
          <Route path="/signuploca" exact component={SignupLoca} />
          <Route path="/addprofile" exact component={AddProfile} />
          <Route path="/postlist" exact component={PostList} />
          <Route path="/postdetail" exact component={PostDetail} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/map" exact component={Map} />
          <Route path="/time" exact component={Time} />
          <Route path="/category" exact component={Category} />
          <Route path="/done" exact component={Done} />
        </ConnectedRouter>
        <FooterMenu />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
`;

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
import Category from "../pages/LoginPages/Category";
import Time from "../components/Time";
import Done from "../pages/LoginPages/Done";
import PostCategory from "../pages/PostCategory";
import PostWrite_1 from "../pages/PostWrite_1";
import PostWrite_2 from "../pages/PostWrite_2";
import PostWrite_3 from "../pages/PostWrite_3";
import ReviewWrite from "../pages/ReviewWrite";

function App() {
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <Route path="/login" exact component={Login} />
          <Route path="/main" exact component={Main} />
          <Route path="/oauth/callback/kakao" component={Redirect} />
          <Route path="/signupdone" exact component={SignupDone} />
          <Route path="/signuploca" exact component={SignupLoca} />
          <Route path="/addprofile" exact component={AddProfile} />
          <Route path="/postlist" exact component={PostList} />
          <Route path="/postdetail" exact component={PostDetail} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/reviewwrite" exact component={ReviewWrite} />
          <Route path="/map" exact component={Map} />
          <Route path="/time" exact component={Time} />
          <Route path="/category" exact component={Category} />
          <Route path="/done" exact component={Done} />
          <Route path="/postcategory" exact component={PostCategory} />
          <Route path="/postwrite1" exact component={PostWrite_1} />
          <Route path="/postwrite2" exact component={PostWrite_2} />
          <Route path="/postwrite3" exact component={PostWrite_3} />
        </ConnectedRouter>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 420px;
`;

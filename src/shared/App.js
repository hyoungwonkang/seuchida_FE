import React, { useEffect } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import {
  Login,
  Redirect,
  SignupDone,
  SignupLoca,
  AddProfile,
  Category,
  Main,
  PostList,
  PostDetail,
  Map,
  ReviewList,
  Done,
  EditDone,
  PostCategory,
  PostWrite_1,
  PostWrite_2,
  PostWrite_3,
  PostWrite_4,
  PostDone,
  MyPage,
  MyPost,
  MyReview,
  ReviewWrite,
  ChatRoom,
  ChatTest,
} from "../pages/Index";
import Chatex from "../pages/Chatex";

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
          <Route path="/postdetail/:postId" exact component={PostDetail} />
          <Route path="/ReviewList/:reviewId" exact component={ReviewList} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/reviewwrite/:postId" exact component={ReviewWrite} />
          <Route path="/mypost" exact component={MyPost} />
          <Route path="/myreview" exact component={MyReview} />
          <Route path="/map" exact component={Map} />
          <Route path="/category" exact component={Category} />
          <Route path="/done" exact component={Done} />
          <Route path="/editdone" exact component={EditDone} />
          <Route path="/postcategory" exact component={PostCategory} />
          <Route path="/postwrite1" exact component={PostWrite_1} />
          <Route path="/postwrite2" exact component={PostWrite_2} />
          <Route path="/postwrite3" exact component={PostWrite_3} />
          <Route path="/postwrite4" exact component={PostWrite_4} />
          <Route path="/postdone" exact component={PostDone} />
          <Route path="/chat" exact component={ChatRoom} />
          <Route path="/chatex" exact component={Chatex} />
          <Route path="/chattest/:postId" exact component={ChatTest} />
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

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
} from "../pages/Index";
import ReviewCardD from "../components/ReviewCardD";

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
          <Route path="/postdetail/:postId" exact component={PostDetail} />
          <Route path="/ReviewList/:reviewId" exact component={ReviewList} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/reviewwrite" exact component={ReviewWrite} />
          <Route path="/mypost" exact component={MyPost} />
          <Route path="/myreview" exact component={MyReview} />
          <Route path="/map" exact component={Map} />
          <Route path="/reviewcardD" exact component={ReviewCardD} />
          <Route path="/category" exact component={Category} />
          <Route path="/done" exact component={Done} />
          <Route path="/postcategory" exact component={PostCategory} />
          <Route path="/postwrite1" exact component={PostWrite_1} />
          <Route path="/postwrite2" exact component={PostWrite_2} />
          <Route path="/postwrite3" exact component={PostWrite_3} />
          <Route path="/postwrite4" exact component={PostWrite_4} />
          <Route path="/postdone" exact component={PostDone} />
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

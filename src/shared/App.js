import React, { Suspense } from "react";
import styled from "styled-components";
import GlobalStyle from "../elements/style/GlobalStyle";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";

import MobileFrame from "../shared/MoileFrame";
import {
  Guide,
  Login,
  KakaoRedirect,
  GoogleRedirect,
  SignupDone,
  SignupLoca,
  AddProfile,
  EditProfile,
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
  Evaluation,
  ReviewDone,
  Chatex,
  ChatList,
  NotFound,
} from "../pages/Index";

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ConnectedRouter history={history}>
          <WebView>
            <Download>앱 사용자 평가하러 GO!</Download>
          </WebView>

          <Suspense
            fallback={
              <Loading>
                <img alt="seuchin" src="./img/loading.gif" width={130} />
                <Txt>Loading...</Txt>
              </Loading>
            }
          >
            <MobileFrame className="MobileFramePage">
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/guide" exact component={Guide} />
                <Route path="/main" exact component={Main} />
                <Route path="/oauth/callback/kakao" component={KakaoRedirect} />
                <Route
                  path="/oauth/callback/google"
                  component={GoogleRedirect}
                />
                <Route path="/signupdone" exact component={SignupDone} />
                <Route path="/signuploca" exact component={SignupLoca} />
                <Route path="/addprofile" exact component={AddProfile} />
                <Route path="/editprofile" exact component={EditProfile} />
                <Route path="/postlist" exact component={PostList} />
                <Route
                  path="/postdetail/:postId"
                  exact
                  component={PostDetail}
                />
                <Route
                  path="/ReviewList/:reviewId"
                  exact
                  component={ReviewList}
                />
                <Route path="/mypage" exact component={MyPage} />
                <Route
                  path="/reviewwrite/:postId"
                  exact
                  component={ReviewWrite}
                />
                <Route path="/reviewevalue" exact component={Evaluation} />
                <Route path="/reviewdone" exact component={ReviewDone} />
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
                <Route path="/ChatList" exact component={ChatList} />
                <Route path="/chatex/:roomId" exact component={Chatex} />
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </MobileFrame>
          </Suspense>
        </ConnectedRouter>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .MobileFramePage {
    z-index: 999;
  }
`;
const WebView = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("./img/webpage2.png");
  background-size: cover;
  /* overflow: hidden; */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Download = styled.button`
  width: 266px;
  height: 71px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #505050;
  font-size: 20px;
  position: absolute;
  top: 300px;
  left: 200px;
  cursor: pointer;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  max-width: 390px;
  padding: 300px 0px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Txt = styled.div`
  color: #0ed88b;
  font-size: 20px;
  font-weight: 800;
`;

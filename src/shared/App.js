import React, { Suspense } from "react";
import styled from "styled-components";
import GlobalStyle from "../elements/style/GlobalStyle";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/room";

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
const token = localStorage.getItem("token");

const socket = io.connect("https://seuchidabackend.shop", {
  transport:['websocket'],

  auth: {
    auth: token,
  },
});

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    socket.on("joinPartyAlert", (data) => {
      dispatch(roomCreators.joinArlam(data));
      dispatch(roomCreators.mainArlam(true));
    });
  }, []);

  React.useEffect(() => {
    socket?.on("alert", (data) => {
      dispatch(roomCreators.chattingArr(data));
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <WebView>
          <MobileFrame className="MobileFramePage">
            <Img src="/img/test.png" />
          </MobileFrame>
        </WebView>
        <MobileFrame className="MobileFramePage">
          <ConnectedRouter history={history}>
            <Suspense
              fallback={
                <Loading>
                  <img alt="seuchin" src="/img/loading.gif" width={130} />
                  <Txt>Loading...</Txt>
                </Loading>
              }
            >
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
            </Suspense>
          </ConnectedRouter>
        </MobileFrame>
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
  background-image: url("/img/background.png");
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  max-width: 390px;
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

const Img = styled.img`
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  vertical-align: middle;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

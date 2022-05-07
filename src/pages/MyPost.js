import React, { useEffect } from "react";
import { Card } from "../components/index";
import styled from "styled-components";
import { history } from "../redux/configStore";
import FooterMenu from "../shared/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import GoBack from "../elements/GoBack";
import { Grid, Image, Text } from "../elements/Index";
import PostDetail from "./PostDetail";

const MyPost = (props) => {
  const dispatch = useDispatch();
  const myPostList = useSelector((state) => state.mypage.myPost);
  // console.log(myPostList);

  // const userId = useSelector((state) => state.user.userInfo.userId);
  // const postOwner = useSelector((state) => state.post.list.nearPosts[0].userId);
  // console.log(userId, postOwner);

  // const isMe = userId === postOwner ? true : false;

  // const isMe = userId === postOwner ? true : false;

  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    dispatch(mypageActions.myPostDB());
  }, []);

  if (!myPostList) return;

  return (
    <Grid>
      <GoBack text="내가 만든 모임" path="/mypage" />

      <Grid>
        {myPostList.map((p, i) => {
          return (
            <Card
              {...p}
              key={p.id}
              center={state.center}
              _onClick={() => {
                history.push(`/postdetail/${p._id}`);
              }}
            />
          );
        })}
        <PostDetail />
      </Grid>
      <FooterMenu />
    </Grid>
  );
};

export default MyPost;

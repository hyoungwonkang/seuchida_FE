import React from "react";
import styled from "styled-components";
import { Card } from "../components/index";
import { useHistory } from "react-router-dom";
import FooterMenu from "../shared/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import GoBack from "../elements/GoBack";
import { Grid, Text } from "../elements/Index";
import PostDetail from "./PostDetail";

const MyPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myPostList = useSelector((state) => state.mypage.myPost);

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
    <>
      <Container>
        <GoBack text="내가 만든 모임" path="/mypage" />
        {/* 쓴글이 없을 때 */}
        {myPostList.length === 0 ? (
          <Grid padding="0px 0px 80px 0px" column>
            <img
              alt="seuchin"
              src="./img/seuchin.png"
              style={{ margin: "150px 0px 0px 0px" }}
            />
            <Text bold margin="0px" color="#C4C4C4">
              아직 쓴 글이 없어요!
            </Text>
            <Text bold margin="0px" color="#C4C4C4">
              지금 바로 새 글을 쓰러 가볼까요?
            </Text>
          </Grid>
        ) : (
          // 쓴 글이 있을 때
          <Grid padding="0px 0px 80px 0px">
            {myPostList.map((p, i) => {
              return (
                <Card
                  {...p}
                  key={p._id}
                  center={state.center}
                  _onClick={() => {
                    history.push(`/postdetail/${p.postId}`);
                  }}
                />
              );
            })}
            <PostDetail />
          </Grid>
        )}

        <FooterMenu />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 0px;
`;

export default MyPost;

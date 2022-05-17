import React from 'react';
import styled from 'styled-components';
import { Card, LCslider, RCslider } from '../components/index';
import { Button } from '../elements/Index';
import FooterMenu from '../shared/FooterMenu';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configStore';

const Main = () => {
  const catepost = useSelector((state) => state.post.list.caPost);
  const post_list = useSelector((state) => state.post.list.nearPost);
  const review = useSelector((state) => state.post.list.filterRe);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
    dispatch(userActions.isLoginDB());
    dispatch(postActions.getMainDB());
  }, []);

  return (
    <>
      <Container>
        {/* 라이브 카드  */}
        <TopLive>
          <LCslider
            catepost={catepost}
            center={state.center}
            user={user.userInfo.nickName}
          />
        </TopLive>

        {/* 스친 운동 한줄평 */}
        <ReviewBox>
          <TitleBox
            onClick={() => {
              window.location.href = '/reviewlist/1';
            }}
          >
            <Title>함께한 스친들의 후기</Title> <Title>&gt;</Title>
          </TitleBox>

          <RCslider review={review} />
        </ReviewBox>

        {/* 여기여기 붙어라 */}

        <TitleBox
          onClick={() => {
            history.push('/postlist');
          }}
        >
          <Title>여기여기 붙어라</Title>
          <Title>&gt;</Title>
        </TitleBox>
        <ListBox>
          <CardBox>
            {post_list?.map((p, l) => {
              return (
                <Card
                  MainCard
                  {...p}
                  key={p.id}
                  center={state.center}
                  _onClick={() => {
                    history.push(`/postdetail/${p._id}`);
                  }}
                />
              );
            })}
          </CardBox>
        </ListBox>
        <Button
          is_float
          _onClick={() => {
            history.push('/postcategory');
          }}
        >
          +
        </Button>
        {/* 푸터 */}
      </Container>
      <FooterMenu />
    </>
  );
};

export default Main;

const Container = styled.section`
  background-color: #e9e9e9;
`;

//라이브 카드
const TopLive = styled.section`
  max-height: 60vh;
  min-height: 450px;
  background-color: #f8f8fa;
`;

// 여기여기 붙어라

const ListBox = styled.section`
  background-color: white;
  padding-bottom: 80px;
`;

const CardBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const TitleBox = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: white;
  z-index: 20;
  margin-bottom: -9px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 25px;
`;
//-- 여기여기 붙어라

// 스친 운동 한줄평

const ReviewBox = styled.section`
  background-color: white;
`;

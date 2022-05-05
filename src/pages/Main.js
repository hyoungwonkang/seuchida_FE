import React from 'react';
import styled from 'styled-components';
import { Card, LCslider, RCslider, ECslider } from '../components/index';
import FooterMenu from '../shared/FooterMenu';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as userActions } from '../redux/modules/user';
const Main = () => {
  const catepost = useSelector((state) => state.post.list.caPost);
  const post_list = useSelector((state) => state.post.list.nearPost);
  const dispatch = useDispatch();

  function getDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') {
        dist = dist * 1.609344;
      }
      if (unit === 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  console.log(catepost);
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
    dispatch(postActions.getPostDB());
    // dispatch(userActions.getUser(state.state))
  }, []);

  return (
    <>
      <Container>
        {/* 라이브 카드  */}
        <TopLive>
          <WellcomeBox>
            <Wellcome>
              user_name님
              <br />
              방금 개설된 가까운 <br />
              <Sports>배드민턴</Sports> 매칭이에요!
            </Wellcome>
          </WellcomeBox>
          <LCslider />
        </TopLive>

        {/* 스친 운동 한줄평 */}
        <ReviewBox>
          <TitleBox>
            <Title>스친 운동 후기</Title> <Title>&gt;</Title>
          </TitleBox>

          <RCslider />
        </ReviewBox>

        {/* 여기여기 붙어라 */}
        <TitleBox>
          <Title>여기여기 붙어라</Title>{' '}
          <Title
            onClick={() => {
              // history.push("/postdetail");
            }}
          >
            &gt;
          </Title>
        </TitleBox>
        <ListBox>
          <CardBox>
            <Card MainCard post_list={post_list} />
          </CardBox>
        </ListBox>

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
  min-height: 500px;
`;

const WellcomeBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 40px;
`;

const Sports = styled.div`
  display: inline;
  color: #222222;
`;

const Wellcome = styled.div`
  color: rgba(123, 123, 123, 1);
`;

// --라이브 카드

//참여한 운동매칭
const EndBox = styled.div`
  background-color: white;
`;

// 여기여기 붙어라

const ListBox = styled.section`
  background-color: white;
  padding-bottom: 80px;
`;

const CardBox = styled.div`
  justify-content: center;
  display: flex;
`;
const TitleBox = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: white;
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

import React from 'react';
import { Card } from '../components/index';
import styled from 'styled-components';
import FooterMenu from '../shared/FooterMenu';
import gBack from '../shared/ImgBox/gBack.png';
import { useSelector, useDispatch } from "react-redux";
import post, { actionCreators as postActions } from "../redux/modules/post";
const PostList = () => {
  const dispatch = useDispatch()
  const post_list = useSelector((state)=> state.post.list.nearPosts)
  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  React.useEffect(() =>{
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
    dispatch(postActions.getPostlistDB())
    // dispatch(userActions.getUser(state.state))
  },[])
  


  return (
    <>
      <Header>
        <Gback>
          <img src={gBack} />
        </Gback>
        <HeadContents>
          <div> 서울시 강남구</div>
        </HeadContents>
      </Header>

      <ListBox>
          {post_list.map((p,i) => {
            return (
              <Card {...p} key={p.id} center={state.center}/>
            )
          })} 
       

      </ListBox>
      <FooterMenu />
    </>
  );
};

export default PostList;

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 24px 0px 0px 24px;
  border-bottom: 1px solid #e9e9e9; ;
`;

const Gback = styled.div``;
const HeadContents = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const ListBox = styled.div`
  margin: 120px 0px 80px 0px;
`;

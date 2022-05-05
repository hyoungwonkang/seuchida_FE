import React from 'react';
import styled from 'styled-components'
import FooterMenu from '../shared/FooterMenu';
import { KakaoMap } from '../components';
import {useDispatch} from "react-redux"
import axios from 'axios';


const Map = () => {
  const token = localStorage.getItem("token");
  const [isOpen , setIsOpen] = React.useState(false)

  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  const [post , setPost] = React.useState(null)
  React.useEffect(() => { //갱신으로 수정해야됨
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/nearPostList`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // console.log(response.data.nearPosts);
      setPost(response.data.nearPosts)
    });

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.watchPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,

        
      }))
    }
  }, [])


 let UserLoca = state.center

  return (
    <>
    <Header>
      <Title>내 주변에 개설된 <br/>운동매칭이에요</Title>
    
    </Header>
    <div style={{marginTop:"128px", }}>
      <button onClick={()=>setIsOpen(true)}>sdsaqwqewqe</button>
      {isOpen && <Modal>awefawefwaef</Modal>}
<KakaoMap MainMap UserLoca ={UserLoca} post={post}/></div>

<FooterMenu/>
    </>
  );
};

export default Map;

const Header = styled.div`
  z-index: 3;
  background-color: white;
  width: 100%;
  height: 100px;
  max-width: 420px;
  padding:  24px;
  position: fixed;
  top:0;
`;

const Title = styled.div`
color : #434343;
font-size: 28px;
font-weight: bold;
margin-top: 12px;
`
const Modal = styled.div`
width: 100%;
height: 350px;
position: fixed;
z-index: 3333;
background-color: green;
bottom: 80px;
transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);

`

const OpenModal = styled.div`


`
import React from "react";
import styled from "styled-components";
import { Card, KakaoMap } from "../components/index";
import gBack from "../shared/ImgBox/gBack.png";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalPortal from "../components/Modal/Portal"; //모달 포탈
import { Image } from "../elements/Index";
import {useDispatch,useSelector } from "react-redux"
import{ actionCreators as postActions } from "../redux/modules/post";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const [modalOn, setModalOn] = React.useState(false);
  const [post , setPost] = React.useState(null)
  const token = localStorage.getItem("token")
  const params = useParams()


  const openModal = (e) => {
    e.stopPropagation();
    setModalOn(true);
  };

  const closeModal = (e) => {
    setModalOn(false);
  };

  const [state, setState] = React.useState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
      });
    

  React.useEffect(()=>{
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
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/postDetail/${params.postId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
   setPost(response.data.post)
    });
    
  },[])

  
  if(!post) return
  return (
    <>
      <Header onClick={closeModal}>
        <img src={gBack} />
        {/* <h2>여기여기 붙어라</h2> */}
      </Header>
      <Container onClick={closeModal}>
        <ProfileBox>
          <Image
          margin="0px 15px 0px 0px"
            shape="circle"
            src={post.userImg}
            size={60}
            _onClick={openModal}
          />
          <ModalPortal>{modalOn && <Modal />}</ModalPortal>

          <User>
            <Master>{post.nickName}</Master>
            <div style={{color:"rgba(120, 120, 120, 1)"}}> {post.userGender}/{post.userAge}세</div>
          </User>
        </ProfileBox>

        <Card DetailCard center={state.center} {...post}/>

        <LiveBox>
          <div style={{fontWeight:"700 bold"}}> 참여중인 운동 메이트 {post?.nowMember?.length}/{post?.maxMember} </div>
          <div className="otherProfile">
            {post?.nowMember?.map((m, i) => {
              return (
               <div   key={m._id}>
                <Image
            
              shape="circle"
              src={m.memberImg}
              size={40}
              margin="3px"
              _onClick={openModal}
            />
            <ModalPortal >{modalOn && <Modal />}</ModalPortal></div>
              )
            })}
       
          </div>
        </LiveBox>
            <KakaoMap {...post}/>

        <ButtonBox>
          <ChatButton>채팅하기</ChatButton>
        </ButtonBox>
      </Container>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  padding-top: 70px;
`;

const ProfileBox = styled.div`
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: row;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Master = styled.div`
font-weight: bold;

`

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 40px;
  padding: 24px 0px 0px 24px;
  display: flex;
  flex-direction: row;
`;

const ButtonBox = styled.div`
  height: 91px;
  border-top: 2px solid E3E3E3;
  align-items: center;
  display: flex;
  justify-content: center;
  bottom: 0;
  position: fixed;
  z-index: 3;
  background-color: white;
  width: 100%;
`;
const ChatButton = styled.button`
  width: 342px;
  height: 54px;
  background-color: #b0b0b0;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
`;

const LiveBox = styled.div`
  padding: 24px;

  .otherProfile {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }
`;
const DetailMap = styled.div`
  padding: 0px 24px 130px 24px;
`;
import React from "react";
import styled from "styled-components";
import { Card, KakaoMap } from "../components/index";
import gBack from "../shared/ImgBox/gBack.png";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalPortal from "../components/Modal/Portal"; //모달 포탈
import { Image } from "../elements/Index";
import {useDispatch,useSelector } from "react-redux"
import{ actionCreators as postActions } from "../redux/modules/post";


const PostDetail = () => {
  const dispatch = useDispatch()
  const post = useSelector((state)=> state.post.list.post)
  console.log(post)
  const [modalOn, setModalOn] = React.useState(false);
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

    dispatch(postActions.getOnePostDB('627073829849a9b92456e4ca'))
  },[])


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
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={60}
            _onClick={openModal}
          />
          <ModalPortal>{modalOn && <Modal />}</ModalPortal>

          <User>
            <Master>김미미</Master>
            <div style={{color:"rgba(120, 120, 120, 1)"}}> 여/21세</div>
          </User>
        </ProfileBox>

        <Card DetailCard center={state.center} {...post}/>

        <LiveBox>
          <div> 참여중인 운동 메이트 2/3 </div>
          <div className="otherProfile">
            <Image
            
              shape="circle"
              src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
              size={40}
              margin="3px"
              _onClick={openModal}
            />
            <ModalPortal>{modalOn && <Modal />}</ModalPortal>
            <Image
              shape="circle"
              src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
              size={40}
              margin="3px"
              _onClick={openModal}
            />
            <ModalPortal>{modalOn && <Modal />}</ModalPortal>
          </div>
        </LiveBox>

        <KakaoMap />

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

import React from "react";
import styled from "styled-components";
import { Card, KakaoMap } from "../components/index";
import gBack from "../shared/ImgBox/gBack.png";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalPortal from "../components/Modal/Portal"; //모달 포탈
import { Image } from "../elements/Index";

const PostDetail = () => {
  const [modalOn, setModalOn] = React.useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setModalOn(true);
  };

  const closeModal = (e) => {
    setModalOn(false);
  };

  return (
    <>
      <Header onClick={closeModal}>
        <img src={gBack} />
        {/* <h2>여기여기 붙어라</h2> */}
      </Header>
      <Container onClick={closeModal}>
        <ProfileBox>
          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={60}
            _onClick={openModal}
          />
          <ModalPortal>{modalOn && <Modal />}</ModalPortal>

          <User>
            <div>김미미</div>
            <div> 여/21세</div>
          </User>
        </ProfileBox>

        <Card DetailCard />

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
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: row;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Profile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 12px;
`;

const OtherProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 12px;
`;

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
  width: 333.5px;
  height: 62.5px;
  background-color: #b0b0b0;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const LiveBox = styled.div`
  padding: 24px;

  .otherProfile {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }
`;

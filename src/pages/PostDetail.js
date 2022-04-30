import React from "react";
import styled from "styled-components";
import { Card, KakaoMap } from "../components/index";
import gBack from "../shared/ImgBox/gBack.png";
const PostDetail = () => {
  return (
    <>
      <Header>
        <img src={gBack} />
      </Header>
      <Container>
        <ProfileBox>
          <Profile src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"></Profile>
          <User>
            <div>김미미</div>
            <div> 여/21세</div>
          </User>
        </ProfileBox>

        <Card DetailCard />

        <LiveBox>
          <div> 참여중인 운동 메이트 2/3</div>
          <div> 프로필 </div>
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

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 40px;
  padding: 24px 0px 0px 24px;
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
`;

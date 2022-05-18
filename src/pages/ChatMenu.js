import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import Image from "../elements/Image";
const ChatMenu = ({ comModalOn, closecomModal, roomId, leaveRoom }) => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.room.list.nowMember);

  React.useEffect(() => {
    dispatch(roomActions.getchatMemberDB(roomId));
  }, []);

  return comModalOn ? (
    <Overlay comModalOn={comModalOn} onClick={closecomModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div> 채팅참여자 </div>
        <div> 게시글보기</div>
        {user_list.map((user, index) => {
          return (
            <div key={user.user_id}>
              <RowBox>
                <Image src={user.userImg} size={50} />
                <div>{user.nickName}</div>
              </RowBox>
            </div>
          );
        })}
        <OutChat onClick={leaveRoom}>채팅방 나가기</OutChat>
      </Container>
    </Overlay>
  ) : null;
};

export default ChatMenu;
const Overlay = styled.section`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  position: fixed;
`;
const slide = keyframes`
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
`;

const Container = styled.section`
  min-height: 100vh;
  height: auto;
  background-color: white;
  width: 83vw;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  animation-duration: 0.6s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ddd;
  padding: 20px;
`;
const OutChat = styled.div`
  position: fixed;
  bottom: 0;
`;

const UserBox = styled.div`
  padding: 24px;
`;

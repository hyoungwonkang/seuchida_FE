import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import Image from "../elements/Image";
import { history } from "../redux/configStore";

const ChatMenu = ({ comModalOn, closecomModal, roomId, leaveRoom, socket }) => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.room.list.nowMember);
  const postId = useSelector((state) => state.room.list.postId);
  const [kick, setKick] = React.useState(false);

  
  React.useEffect(() => {
    dispatch(roomActions.getchatMemberDB(roomId));
  }, []);

  React.useEffect(() => {
    socket.on("ban", (data) => {
      if (data === true) {
        setKick(true);
      }
    });
  }, []);
  if (kick === true) {
    socket.emit("banUserOut", { roomId: roomId });
    window.alert('방장에 의해 강퇴 당하셨습니다.')
    window.location.href = "/main";
    setKick(false);
  }
  return comModalOn ? (
    <Overlay comModalOn={comModalOn} onClick={closecomModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Menu
          style={{ marginTop: "40px" }}
          onClick={() => history.push(`/postdetail/${postId}`)}
        >
          게시글보기
        </Menu>
        <Menu> 참여자 목록 </Menu>
        {user_list?.map((user, index) => {
          const banUser = () => {
            socket.emit("banUser", { userId: user.userId });
            // window.location.href = "/main";
          };
          return (
            <div key={user?._id}>
              <RowBox>
                <Image src={user?.userImg} size={50} />
                <div>{user?.nickName}</div>
                <button onClick={banUser}>강태연습</button>
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
  margin: 0px 30px 30px 0px;
  bottom: 0;
  right: 0;
`;
const Menu = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
`;

const UserBox = styled.div`
  padding: 24px;
`;

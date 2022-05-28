import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Image from "../elements/Image";
import { history } from "../redux/configStore";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import { BiExit } from "react-icons/bi";


const ChatMenu = ({ comModalOn, closecomModal, roomId, leaveRoom, socket }) => {
  const user_list = useSelector((state) => state.room.list.nowMember);
  const postId = useSelector((state) => state.room.list.postId);
  const ownerId = useSelector((state) => state.room.list.owner);
  const userMe = useSelector((state) => state.user.userInfo);
  const IsOwner = userMe.userId === ownerId;
  //모달
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [kick, setKick] = React.useState(false);

  React.useEffect(() => {
    socket.on("ban", (data) => {
      if (data === true) {
        setKick(true);
      }
    });
  }, []);
  if (kick === true) {
    socket.emit("banUserOut", { roomId: roomId });
    window.alert("방장에 의해 강퇴 당하셨습니다.");
    window.location.href = "/main";
    setKick(false);
  }
  return comModalOn ? (
    <Overlay comModalOn={comModalOn} onClick={closecomModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Menu
          style={{ marginTop: "40px", cursor: 'pointer', backgroundColor:"#E6E6E6" }}
          onClick={() => history.push(`/postdetail/${postId}`)}
        >
          게시글보기
        </Menu>
        <Menu> 참여자 목록 </Menu>
        <RowBox>
          <Image
            src={userMe.userImg}
            size={50}
            _onClick={() => {
              setModalData(userMe);
              setIsOpen(true);
            }}
          />
          <UserBox>{userMe?.nickName}</UserBox>
        </RowBox>
        {user_list?.map((user, index) => {
          const banUser = () => {
            socket.emit("banUser", { userId: user.userId });
          };
          if (user.userId !== userMe.userId)
            return (
              <div key={user?._id}>
                <RowBox>
                  <Image
                    src={user?.userImg}
                    size={50}
                    _onClick={() => {
                      setModalData(user);
                      setIsOpen(true);
                    }}
                  />
                  <UserBox>{user?.nickName}</UserBox>
                  {IsOwner === true && <GoOut onClick={banUser}>강퇴</GoOut>}
                </RowBox>
              </div>
            );
        })}
        <OutChat onClick={leaveRoom}><BiExit size={36} color={'#505050'}/></OutChat>
        {/* 참여자 프로필 모달 */}
        <Modal open={isOpen}>
          <ModalData
            Members
            post={modalData}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </Container>
      ;
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
  width: 300px;
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

const GoOut = styled.button`
  background: transparent;
  border: none;
  color: #c4c4c4;
  margin-top: 10px;
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const OutChat = styled.div`
  position: fixed;
  margin: 0px 30px 30px 0px;
  bottom: 0;
  right: 0;
  font-weight: 600;
  cursor: pointer;
`;
const Menu = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
 
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

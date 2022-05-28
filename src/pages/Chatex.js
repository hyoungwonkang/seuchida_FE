import React, { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import GoBack from "../elements/GoBack";
import Image from "../elements/Image";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as roomActions } from "../redux/modules/room";
import { useParams } from "react-router-dom";
import { history } from "../redux/configStore";
import ChatMenu from "./ChatMenu";
import { MdSend } from "react-icons/md";

const token = localStorage.getItem("token");
const socket = io.connect("https://seuchidabackend.shop", {
  auth: {
    auth: token,
  },
});
function Chatex(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.room.list.nowMember);
  const user = useSelector((state) => state.user.userInfo);
  const roomId = params.roomId;
  const [message, setMessage] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [chat, setChat] = useState([]);
  const [systemMsg, setSystemMsg] = useState([]);
  const [nowM, setnowM] = useState(1);
  const [comModalOn, setcomModalOn] = useState(false);
  const chattingBox = useRef(null);

  const scrollToBottom = () => {
    if (chattingBox.current) {
      chattingBox.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  };
  const openModal = () => {
    setcomModalOn(true);
  };
  const closecomModal = (e) => {
    setcomModalOn(false);
  };

  const roomInfo = props?.location.state;
  //작성시간 변환 함수
  const TimeCheck = (t) => {
    let time = t.split(" ")[1];
    let hour = time.split(":")[0];

    if (hour > 12) {
      hour = `오후 ${hour - 12}`;
    } else {
      hour = `오전 ${hour}`;
    }
    return `${hour}:${time.split(":")[1]}`;
  };

  //시스템 메세지 오면 다시 방정보 가져오기
  useEffect(() => {
    dispatch(roomActions.getchatMemberDB(roomId));
  }, [systemMsg]);

  //현재인원 바꾸기
  useEffect(() => {
    setnowM(user_list?.length);
  }, [user_list]);

  //방 조인
  useEffect(() => {
    dispatch(userActions.isLoginDB());
    socket?.emit("join", {
      roomId,
    });
    return;
  }, [roomId]);

  //방마다 메세지 수신
  useEffect(() => {
    socket.on("broadcast", (data) => {
      setChat((chat) => chat.concat(data));
      if (data.name === "System") {
        setSystemMsg((systemMsg) => systemMsg.concat(data));
      }
    });
  }, []);

  //채팅 오면 스크롤 하단으로 내리기
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  //이전 채팅 리스트 받아오기
  useEffect(() => {
    socket.on("chatlist", (data) => {
      setChatlist(data);
    });
  }, [chatlist]);

  //메세지 전송
  //userId는 방마다 참여중인 유저리스트 ( 나 제외
  let userId = [];
  for (let i = 0; i < user_list?.length; i++) {
    if (user_list[i].userId !== user.userId) {
      userId.push(user_list[i].userId);
    }
  }
  const sendMessage = useCallback(
    (e) => {
      if (message) {
        e.preventDefault();
        socket.emit("chat", { roomId, msg: message, userId }, setMessage(""));
      }
    },
    [message]
  );
  //Enter치면 메세지 전송
  useEffect(() => {
    const press = (e) => {
      if (e.key === "Enter") {
        if (message) {
          e.preventDefault();
          socket.emit("chat", { roomId, msg: message, userId }, setMessage(""));
        }
      }
    };
    window.addEventListener("keydown", press);
    return () => window.removeEventListener("keydown", press);
  }, [message]);

  // 방 나가기
  const leaveRoom = () => {
    socket.emit("leave", { roomId });
    history.replace("/chatlist");
  };

  // 안읽은 채팅 기록하기
  const BackRoom = () => {
    socket.emit("back", { roomId, userId: user.userId });
    history.goBack();
  };

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    history.replace("/chatlist");
  }

  return (
    <>
      <ChatMenu
        comModalOn={comModalOn}
        closecomModal={closecomModal}
        roomId={roomId}
        leaveRoom={leaveRoom}
        socket={socket}
      />

      <Header>
        <HeaderContents>
          <RowBox>
            <GoBack gback _onClick={BackRoom} />
            <div style={{ margin: "3px 0px 0px 10px" }}>
              {roomInfo?.postTitle}
            </div>
            <div style={{ margin: "3px 0px 0px 15px", color: "#C4C4C4" }}>
              {nowM}/{roomInfo?.maxMember}
            </div>
          </RowBox>

          <div onClick={openModal}>BUT</div>
        </HeaderContents>
      </Header>

      <Body ref={chattingBox}>
        {/* 이전 채팅  */}
        {chatlist.map((prevChat, index) => {
          return prevChat.name === "System" ? null : prevChat.name ===
            user.nickName ? (
            <IsMe key={`${prevChat.createdAt}+${index}`}>
              <TextBoxMe>{prevChat.msg}</TextBoxMe>
              <TimeBox>{TimeCheck(prevChat.createdAt)}</TimeBox>
            </IsMe>
          ) : (
            <div key={`${prevChat.createdAt}+${index}`}>
              <RowBox>
                <Image src={prevChat.userImg} size={32} />
                <NameBox>{prevChat.name}</NameBox>
              </RowBox>

              <RowBox>
                <TextBox>{prevChat.msg}</TextBox>
                <TimeBox>{TimeCheck(prevChat.createdAt)}</TimeBox>
              </RowBox>
            </div>
          );
        })}

        {/* 라이브 채팅 */}
        {chat.map((chat, index) => {
          return chat.name === "System" ? (
            <SystemMsg key={`${chat.createdAt}+${index}`}>{chat.msg}</SystemMsg>
          ) : chat.name === user.nickName ? (
            <IsMe key={`${chat.createdAt}+${index}`}>
              <TextBoxMe>{chat.msg}</TextBoxMe>
              <TimeBox>{TimeCheck(chat.createdAt)}</TimeBox>
            </IsMe>
          ) : (
            <>
              <div key={`${chat.createdAt}+${index}`}>
                <RowBox>
                  <Image src={chat.userImg} size={32} />
                  <NameBox>{chat.name}</NameBox>
                </RowBox>

                <RowBox>
                  <TextBox>{chat.msg}</TextBox>
                  <TimeBox>{TimeCheck(chat.createdAt)}</TimeBox>
                </RowBox>
              </div>
            </>
          );
        })}
      </Body>
      <Chatting>
        <div>
          <TextMsg
            autoFocus
            value={message}
            placeholder="내용을 입력하세요."
            onChange={(e) => setMessage(e.target.value)}
            onkeyup="enterkey()"
          />

          <Send onClick={sendMessage}>
            <MdSend size={25} color="#787878" />
          </Send>
        </div>
      </Chatting>
    </>
  );
}

export default Chatex;
const Header = styled.div`
  height: 95px;
  top: 0;
  position: fixed;
  border-bottom: 1px solid #e6e6e6;
  background-color: white;
  width: 100%;
`;

const HeaderContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  margin: 16px;
  padding: 20px 0px;
`;

const Body = styled.div`
  margin: 100px 24px 0px 24px;
  overflow: auto;
  padding-bottom: 80px;
`;

const Chatting = styled.div`
  bottom: 0;
  position: fixed;
  height: 80px;
  background-color: #f1f1f5;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SystemMsg = styled.div`
  font-size: 14px;
  text-align: center;
  color: #787878;
`;

const TextMsg = styled.input`
  font-size: 16px;
  padding: 16px;
  /* height: 54px; */
  width: 310px;
  border: none;
  border-radius: 12px;
`;

const Send = styled.span`
  bottom: 23px;
  right: 33px;
  position: fixed;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const TimeBox = styled.span`
  font-size: 14px;
  color: #787878;
  display: flex;
  flex-direction: column-reverse;
  margin: 0px 8px 15px 8px;
`;
const NameBox = styled.div`
  color: #c4c4c4;
  margin: 4px 0px 0px 8px;
`;

const TextBox = styled.div`
  display: flex;
  background-color: #f1f1f5;
  padding: 15px;
  border-radius: 8px;
  margin: 8px 0px 15px 40px;
  max-width: 190px;
`;
const IsMe = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const TextBoxMe = styled.div`
  border: 1px solid #dddddd;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0px;
  max-width: 200px;
`;

import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import GoBack from "../elements/GoBack";
import Image from "../elements/Image";



const token = localStorage.getItem("token")
const socket = io.connect("https://seuchidabackend.shop" ,{
  auth: {
    auth: token,
  },
});

function Chatex(props) {
  const roomId = props.location.state;
  const [message, setMessage] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [chat, setChat] = useState([]);

    console.log(roomId)

  useEffect(() => {
    socket?.emit("join", {
      roomId
   
    });
  }, [socket]);

  useEffect(() => {
    socket.on("broadcast", (data) => {
      setChat((chat) => chat.concat(data));
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on("chatlist", (data) => {
      setChatlist(data);
    });
  }, []);

  const sendMessage = useCallback(
    (e) => {
      if (message) {
        e.preventDefault();
        socket.emit(
          "chat",
          { roomId,msg: message },
          setMessage("")
        );
      }
    },
    [message]
  );

  const leaveRoom = () => {
    socket.emit("leave", { roomId});
  };

  return (
    <div>
      <Header>
        <HeaderContents>
          <GoBack gback />
          <div style={{margin: "3px 0px 0px 10px"}}>제목 들어갈 공간</div>
          <div style={{ margin: "3px 0px 0px 15px", color: "#C4C4C4" }}> 2/3</div>
        </HeaderContents>
        <button> 모집완료 </button>
      </Header>

      <Body>
        {chatlist.map((prevChat, index) => {
          if (index < 30)
            return (
              <p>
                작성자:{prevChat.name} 내용:{prevChat.msg}
              </p>
            );
        })}
        {chat.map((chat, index) => {
          return (
            <p>
              작성자:{chat.name} 내용:{chat.msg}
            </p>
          );
        })}
      
      </Body>
      <Chatting>
        <SendMsg>
          <TextMsg
            value={message}
            placeholder="내용을 입력하세요."
            onChange={(e) => setMessage(e.target.value)}
          />

          <Send onClick={sendMessage}>전송</Send>
          <button onClick={leaveRoom}>나가기</button>
        </SendMsg>
      </Chatting>
    </div>
  );
}

export default Chatex;
const Header = styled.div`
  height: 155px;
  top: 0;
  position: fixed;
  border-bottom: 1px solid #e6e6e6;
  background-color: white;
  width: 100%;
`;

const HeaderContents = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  margin: 16px;
`;

const Body = styled.div`
  margin-top: 156px;
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

const SendMsg = styled.div`
 
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

right: 30px;
position: fixed;
`
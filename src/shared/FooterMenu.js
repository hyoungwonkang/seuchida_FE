import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Image } from "../elements/Index";
import { io } from "socket.io-client";
import { actionCreators as roomCreators } from "../redux/modules/room";
import { useDispatch, useSelector } from "react-redux";

const token = localStorage.getItem("token");
        let socket = io.connect("https://seuchidabackend.shop", {
          auth: {
            auth: token,
          },
        });

const FooterMenu = (props) => {
  const history = useHistory();
  const { next, is_check, __onClick, Chat } = props;
  const dispatch = useDispatch()
  const chatalarm = useSelector(state=> state.room.alarm)
  const mainalarm = useSelector(state=> state.room.mainarr)

  const readArlam = () =>{
  dispatch(roomCreators.setalarm(false))
              localStorage.removeItem("main");
            localStorage.removeItem("map");
            localStorage.setItem("chat", "chat");
            localStorage.removeItem("mypage");
  history.push("/chatlist");
  }
  const readMain = () =>{
    dispatch(roomCreators.mainArlam(false))
    localStorage.setItem("main", "main");
    localStorage.removeItem("map");
    localStorage.removeItem("chat");
    localStorage.removeItem("mypage");
    history.push("/main");
  }
  
  React.useEffect(() => {
    socket?.on("alert", (data) => {
      dispatch(roomCreators.setalarm(true))
    })
    },[]);

    React.useEffect(() => {
      return ()=>socket.disconnect()
      
      },[]);
  
    React.useEffect(()=>{
      socket.on("joinPartyAlert", (data) => {
        dispatch(roomCreators.joinArlam(data))
       dispatch(roomCreators.mainArlam(true))
      })       
      },[])

  if (Chat) {
    return (
      <Btns>
        <Button
          bg="white"
          color="#5796f7"
          br="1px solid #5796f7"
          wd="150px"
          _onClick={() => {
            //액션 실행
            if (props.event) {
              return props.event();
            }
          }}
          margin={"12px 10px 0px 0px"}
        >
          참여취소
        </Button>
        <Button
          wd="150px"
          _onClick={() => {
            //페이지 이동
            if (props.path) {
              history.push(props.path);
            }
            //액션 실행
            if (props.event) {
              return props.event();
            }
            //유효성 검사 실행
            if (props.state) {
              return props.state();
            }
          }}
          margin={"12px 0px 0px 0px"}
        >
          채팅하기
        </Button>
      </Btns>
    );
  }


  if (next) {
    return (
      <Btn>
        <Button
          _onClick={() => {
            //페이지 이동
            if (props.path) {
              history.push(props.path);
            }
            //액션 실행
            if (props.event) {
              return props.event();
            }
            //유효성 검사 실행
            if (props.state) {
              return props.state();
            }
          }}
          margin={"12px 0px 0px 0px"}
        >
          {props.text}
        </Button>
      </Btn>
    );
  }
  if (is_check) {
    return (
      <Btn>
        <Button bg="#c4c4c4" margin={"12px 0px 0px 0px"}>
          {props.text}
        </Button>
      </Btn>
    );
  }

  return (
    <Container>
      <MenuBox>
        <Menu     
          onClick={readMain}
        >
           {mainalarm && <NewArlam>new</NewArlam>}
          {localStorage.getItem("main") === "main" ? (
            <img alt="home" src="/img/footer/homeg.png" />
          ) : (
            <img alt="home" src="/img/footer/home.png" />
          )}
        </Menu>
        <Menu
          onClick={() => {
            localStorage.removeItem("main");
            localStorage.setItem("map", "map");
            localStorage.removeItem("chat");
            localStorage.removeItem("mypage");
            history.push("/map");
          }}
        >
          {localStorage.getItem("map") === "map" ? (
            <img alt="around" src="/img/footer/aroundg.png" />
          ) : (
            <img alt="around" src="/img/footer/around.png" />
          )}
        </Menu>
        <Menu

          onClick={readArlam}>
          {chatalarm && <NewArlam>new</NewArlam>}
          {localStorage.getItem("chat") === "chat" ? (
            <img alt="chat" src="/img/footer/chatg.png" />
          ) : (
            <img alt="chat" src="/img/footer/chat.png" />
          )}
        </Menu>
        <Menu
          onClick={(e) => {
            localStorage.removeItem("main");
            localStorage.removeItem("map");
            localStorage.removeItem("chat");
            localStorage.setItem("mypage", "mypage");
            history.push("/mypage");
          }}
        >
          {localStorage.getItem("mypage") === "mypage" ? (
            <img alt="profile" src="/img/footer/smileg.png" />
          ) : (
            <img alt="profile" src="/img/footer/smile.png" />
          )}
        </Menu>
      </MenuBox>
    </Container>
  );
};

export default FooterMenu;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  border-top: 1px solid #e9e9e9;
  width: 100%;
  background-color: white;
  max-width: 390px;
  z-index: 5;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 15px;
`;

const Menu = styled.div`
  cursor: pointer;
  color: ${(props) => (props.onClick ? "white" : "black")};
`;

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  border-top: 1px solid #e9e9e9;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  background-color: white;
  box-shadow: 0px -2px 4px 2.5px #ddd;
  min-width: 390px;
  z-index: 5;
`;

const NewArlam = styled.div`

position: fixed;
z-index: 999;
background-color: #FF6A52;
margin-left: 20px;
bottom: 50px;
padding: 4px;
border-radius: 20px;
font-size: 12px;
`

const Btns = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  border-top: 1px solid #e9e9e9;
  width: 20vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 45px;
  margin: auto;
  background-color: white;
  box-shadow: 0px -2px 4px 2.5px #ddd;
  min-width: 390px;
  z-index: 5;
`;


import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Image } from "../elements/Index";
import { io } from "socket.io-client";

const token = localStorage.getItem("token");
const socket = io.connect("https://seuchidabackend.shop", {
  auth: {
    auth: token,
  },
});
const FooterMenu = (props) => {
  const history = useHistory();
  const { next, is_check, __onClick } = props;
  const [alarm , setAlarm] = React.useState([])
 
  console.log(alarm)
  React.useEffect(() => {
    socket.on("broadcast", (data) => {
     setAlarm((alarm) => alarm.concat(data));
    });
  }, []);


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
          onClick={() => {
            // history.push("/main");
            window.location.href = "/main";
          }}
        >
          홈
        </Menu>
        <Menu
          onClick={() => {
            // history.push("/map");
            window.location.href = "/map";
          }}
        >
          내주변
        </Menu>
        <Menu
          onClick={() => {
            history.push("/chatlist");
          }}
        >
          채팅{alarm?.length}
        </Menu>
        <Menu
          onClick={() => {
            history.push("/mypage");
          }}
        >
          프로필
        </Menu>
      </MenuBox>
    </Container>
  );
};

export default FooterMenu;

const Container = styled.div`
  position: fixed;
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
  padding: 24px;
`;

const Menu = styled.div`
  font-size: 16px;
  color: #787878;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  border-top: 1px solid #e9e9e9;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  background-color: white;
  box-shadow: 0px -2px 4px 2.5px #ddd;
  min-width: 390px;
  z-index: 5;
`;

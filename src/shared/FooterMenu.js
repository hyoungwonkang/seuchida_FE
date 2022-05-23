import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Image } from "../elements/Index";

const FooterMenu = (props) => {
  const history = useHistory();
  const { next, is_check, __onClick } = props;

  const [click, setClick] = React.useState("");

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
          onClick={(e) => {
            setClick("main");
            window.location.href = "/main";
          }}
        >
          {click === "main" ? (
            <img alt="home" src="./img/footer/homeg.png" />
          ) : (
            <img alt="home" src="./img/footer/home.png" />
          )}
        </Menu>
        <Menu
          onClick={() => {
            setClick("map");
            history.push("/map");
            // window.location.href = "/map";
          }}
        >
          {click === "map" ? (
            <img alt="around" src="./img/footer/aroundg.png" />
          ) : (
            <img alt="around" src="./img/footer/around.png" />
          )}
        </Menu>
        <Menu
          onClick={() => {
            setClick("chat");
            history.push("/chatlist");
          }}
        >
          {click === "chat" ? (
            <img alt="chat" src="./img/footer/chatg.png" />
          ) : (
            <img alt="chat" src="./img/footer/chat.png" />
          )}
        </Menu>
        <Menu
          onClick={(e) => {
            setClick("mypage");
            history.push("/mypage");
          }}
        >
          {click === "mypage" ? (
            <img alt="profile" src="./img/footer/smileg.png" />
          ) : (
            <img alt="profile" src="./img/footer/smile.png" />
          )}
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

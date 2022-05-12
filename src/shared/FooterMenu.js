import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Button } from "../elements/Index";

const FooterMenu = (props) => {
  const { next, is_check } = props;

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
            history.push("/main");
          }}
        >
          홈
        </Menu>
        <Menu
          onClick={() => {
            history.push("/map");
          }}
        >
          내주변
        </Menu>
        <Menu
          onClick={() => {
            history.push('/challenge');
          }}
        >
          챌린지
        </Menu>
        <Menu
          onClick={() => {
            history.push("/chatlist");
          }}
        >
          채팅
        </Menu>
        <Menu
          onClick={() => {
            history.push("/mypage");
          }}
        >
          마이페이지
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
  max-width: 420px;
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
`;

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  border-top: 1px solid #e9e9e9;
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  background-color: white;
  min-width: 390px;
  box-shadow: 0px -2px 4px 2.5px #ddd;
  z-index: 5;
`;

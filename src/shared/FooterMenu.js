import React from "react";
import styled from "styled-components";
const FooterMenu = (props) => {
  return (
    <Container>
      <MenuBox>
        <Menu>홈</Menu>
        <Menu>내주변</Menu>
        <Menu>챌린지</Menu>
        <Menu>채팅</Menu>
        <Menu>마이페이지</Menu>
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
`


const Menu = styled.div`
  font-size: 16px;
  color: #787878;
 
`;

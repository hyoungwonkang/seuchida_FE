import React from 'react';
import styled from 'styled-components'
const FooterMenu = () => {
  return (
    <Container>
      <MenuBar>
    <Menu>홈</Menu>
    <Menu>내주변</Menu>
    <Menu>챌린지</Menu>
    <Menu>채팅</Menu>
    <Menu>마이페이지</Menu>


      </MenuBar>
    </Container>
  );
};

export default FooterMenu;

const Container = styled.section`
position: fixed;
bottom: 0;
height: 60px;
border-top: 1px solid #e9e9e9;
width: 100%;
background-color: white;
max-width: 420px;

`

const MenuBar = styled.div`
display: flex;
justify-content: space-around;
padding: 20px;

`

const Menu = styled.div`
 font-size: 14px;
`
import React from "react";
import reactDom from "react-dom";
import styled from "styled-components";
import { Grid, Image, Text } from "../../elements/Index";
import { BiCategory } from "react-icons/bi";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return reactDom.createPortal(children, el);
};

const Modal = (props) => {
  return (
    <ModalPortal>
      <Background>
        <Grid width="342px" bg="pink" height="356px" br="10px" padding="15px">
          <Grid height="auto" row>
            <Image shape="circle" src={props.Cate} size={60} margin="3px" />
            {/* <Grid column> */}
            <Image src="./img/red_medal.png" />
            <Text margin="0px">{props.user?.nickName}</Text>
            <Text margin="0px">{props.user?.nickName}여/21세</Text>
            {/* </Grid> */}
          </Grid>
          Category
          <Text>운동에 관심이 많은 상대방 입니다 재미있게 같이 운동해요:</Text>
        </Grid>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  width: 100%;
  height: 80%;
  max-width: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;

const Content = styled.div`
  width: 300px;
  height: 300px;
  margin-top: 70px;
  position: relative;
  /* overflow: scroll; */
  background: skyblue;
  border-radius: 20px;
  padding: 20px;
`;

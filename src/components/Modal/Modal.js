//Modal.js

import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";


const Modal = (props) => {
 
  return (
    <ModalPortal>
      <Background>
        <Content>이걸 어쩔거니 ?</Content>
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

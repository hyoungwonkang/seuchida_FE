import React from "react";
import styled from "styled-components";
const Header = ({ children }) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  min-width: 420px;
  width: 390px;
  height: 112px;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 5;
  align-items: center;
  display: flex;
  padding: 0px 24px;

  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0px 3px 5px 1px #e0e0e0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

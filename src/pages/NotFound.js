import React from "react";
import { Grid, Button, Text } from "../elements/Index";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const history = useHistory();
  return (
    <Grid column bg="white" height="auto" padding="200px 0px 0px 0px">
      <Txt>페이지를 찾을 수 없어요!</Txt>
      <Grid column padding="20px 0px 0px 0px">
        <img alt="seuchin" src="/img/seuchin.png" />
        <Back
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로가기
        </Back>
      </Grid>
    </Grid>
  );
};

export default NotFound;

const Txt = styled.h2`
  /* padding: 170px 0px 0px 0px; */
`;

const Back = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #00d282;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 30px 0px 0px 0px;
`;

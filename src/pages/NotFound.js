import React from "react";
import { Grid, Button, Text } from "../elements/Index";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const history = useHistory();
  return (
    <Grid column bg="white" height="800px">
      {/* <img
        src="./img/notfound.png"
        alt="notfound"
        style={{ width: "100%", height: "800px" }}
      /> */}
      <Txt>페이지를 찾을 수 없어요!</Txt>
      <Seuchin alt="seuchin" src="./img/seuchin.png" />
      <Back
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </Back>
    </Grid>
  );
};

export default NotFound;

const Txt = styled.h2`
  padding: 150px 0px 0px 0px;
`;

const Seuchin = styled.img`
  background-image: url("./img/seuchin/png");
  margin: 0px 0px 400px 0px;
`;

const Back = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 5px;
  position: absolute;
  bottom: 300px;
  background: #00d282;
  color: white;
  font-size: 16px;
`;

import React from "react";
import { Grid, Button, Text } from "../elements/Index";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const history = useHistory();
  return (
    <Grid column>
      <img
        src="./img/notfound.png"
        alt="notfound"
        style={{ width: "100%", height: "800px" }}
      />
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

const Back = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 5px;
  position: absolute;
  top: 280px;
  background: #00d282;
  color: white;
  font-size: 16px;
`;

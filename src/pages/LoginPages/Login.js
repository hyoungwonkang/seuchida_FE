import React, { useCallback } from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../shared/OAuth";
import { Grid, Button, Image, Text } from "../../elements/Index";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  return (
    <Grid column height="800px" bg="#00D282">
      {/* <Grid height="auto" column margin="250px 0px 50px 0px"> */}
      <Grid column width="200px" height="200px" margin="auto">
        <img src="./img/login.png" style={{ margin: "150px 0px" }} />
      </Grid>
      <Around onClick={() => history.push("/guide")}>둘러보기</Around>
      <Button
        bg="#FDE333"
        margin="250px 0px 0px 0px"
        _onClick={() => {
          window.location.href = "/main";
        }}
      >
        <A href={KAKAO_AUTH_URL}>카카오 로그인</A>
      </Button>
      <Button
        bg="red"
        margin="20px 0px 50px 0px"
        _onClick={() => {
          window.location.href = "/main";
        }}
      >
        <A href={GOOGLE_AUTH_URL}>구글 로그인</A>
      </Button>
      {/* </Grid> */}
    </Grid>
  );
};

export default Login;

const A = styled.a`
  text-decoration-line: none;
  color: white;
  display: block;
  height: 40px;
  padding-top: 6px;
`;

const Around = styled.button`
  min-width: "100px";
  height: 40px;
  margin: 120px 0px -20px 0px;
  background: #ff6b52;
  border: none;
  border-radius: 5px;
  color: white;
`;

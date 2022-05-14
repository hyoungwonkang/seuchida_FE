import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import { Grid, Button, Image, Text } from "../../elements/Index";

const Login = (props) => {
  return (
    <Grid column height="750px" bg="#00D282">
      {/* <Grid height="auto" column margin="250px 0px 50px 0px"> */}
      <Grid column width="200px" height="200px" margin="auto">
        <img src="./img/login.png" style={{ margin: "150px 0px" }} />
      </Grid>
      <Button
        bg="#FDE333"
        margin="250px 0px 50px 0px"
        _onClick={() => {
          window.location.href = "/main";
        }}
      >
        <A href={KAKAO_AUTH_URL}>카카오 로그인</A>
      </Button>
      {/* </Grid> */}
    </Grid>
  );
};

export default Login;

const A = styled.a`
  text-decoration-line: none;
  color: white;
`;

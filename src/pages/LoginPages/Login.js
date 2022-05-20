import React, { useCallback } from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../shared/OAuth";
import { Grid, Button, Image, Text } from "../../elements/Index";
import GoogleLogin from "react-google-login";

const Login = (props) => {
  // const googleLogin = () => {
  //   const googleApi = `http://localhost:3000/oauth/google/callback`;
  //   window.location.assign(googleApi);
  // };

  return (
    <Grid column height="750px" bg="#00D282">
      {/* <Grid height="auto" column margin="250px 0px 50px 0px"> */}
      <Grid column width="200px" height="200px" margin="auto">
        <img src="./img/login.png" style={{ margin: "150px 0px" }} />
      </Grid>
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
      {/* <GoogleLogin
        clientId="564371697897-1i3sqbvjln4ie2poqo8rklmj83rl5435.apps.googleusercontent.com"
        buttonText="구글 로그인"
        onSuccess={googleLogin}
        onFailure={(err) => {
          console.log(err);
        }}
        cookiePolicy={"single_host_origin"}
      /> */}
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

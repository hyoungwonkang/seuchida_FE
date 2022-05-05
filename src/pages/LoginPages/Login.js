import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import { useHistory } from "react-router-dom";
import { Grid, Button, Text } from "../../elements/Index";

const Login = (props) => {
  const history = useHistory();
  return (
    <Grid column height="750px">
      <Grid height="auto" column margin="250px 0px 50px 0px">
        <Text size="20px" margin="0px">
          나와 가장 가까운 스포츠 친구
        </Text>
        <Text size="40px" margin="5px 0px 0px 0px">
          스치다!
        </Text>

        <Button
          bg
          margin="131px 0px 8px 0px"
          _onClick={() => {
            history.push("/main");
          }}
        >
          <A href={KAKAO_AUTH_URL}>카카오 로그인</A>
        </Button>
        <Button margin="0px 0px 100px 0px">그냥 둘러보기</Button>
      </Grid>
    </Grid>
  );
};

export default Login;

const A = styled.a`
  text-decoration-line: none;
  color: white;
`;

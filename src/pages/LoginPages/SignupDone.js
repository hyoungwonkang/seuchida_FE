import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Grid, Button, Text } from "../../elements/Index";

const SignupDone = () => {
  const history = useHistory();

  return (
    <Grid column margin="150px auto">
      <Text size="24px" bold text_align>
        회원가입이 <br /> 완료되었습니다!
      </Text>
      <Text>
        내 동네를 설정하고 <br /> 가장 가까운 스친을 찾아보세요!
      </Text>
      <Button
        text="내 동네 설정하고 시작하기"
        bold
        _onClick={() => {
          history.push("/signuploca");
        }}
      ></Button>
    </Grid>
  );
};

export default SignupDone;

import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Text } from "../../elements/Index";

const SignupDone = () => {
  const history = useHistory();

  return (
    <Grid column height="750px">
      <Grid height="auto" column margin="auto">
        <Text size="24px" bold margin="0px">
          회원가입이
        </Text>
        <Text size="24px" bold margin="0px 0px 30px 0px">
          완료되었습니다!
        </Text>
        <Text color="gray" margin="0px">
          내 동네를 설정하고
        </Text>
        <Text color="gray" margin="0px">
          가장 가까운 스친을 찾아보세요!
        </Text>
        <Button
          bold
          _onClick={() => {
            history.replace("/signuploca");
          }}
          margin="50px 0px 0px 0px"
        >
          내 동네 설정하고 시작하기
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignupDone;

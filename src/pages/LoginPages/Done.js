import React from "react";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";

const Done = () => {
  return (
    <Grid column margin="200px 0px">
      <Text size="24px">
        프로필 작성이 <br />
        완료되었어요:)
      </Text>
      <Text size="16px" color="gray" margin="0px 0px 5px 0px ">
        나의 가장 가까운 스친을
      </Text>
      <Text size="16px" color="gray" margin="0px">
        찾으러 떠나 볼까요?
      </Text>
      <FooterMenu next path="/main" text="다음" />
    </Grid>
  );
};

export default Done;

import React from "react";
import { Grid, Text } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";

const ReviewDone = () => {
  document.body.style.overscrollBehavior = "none";
  return (
    <Grid column margin="167px auto 0px auto">
      <img src="./img/seuchin.png" />
      <Text size="24px" bold margin="0px">
        후기 작성이
      </Text>
      <Text size="24px" bold margin="0px">
        완료되었어요:)
      </Text>
      <FooterMenu next path="/mypage" text="확인" />
    </Grid>
  );
};

export default ReviewDone;

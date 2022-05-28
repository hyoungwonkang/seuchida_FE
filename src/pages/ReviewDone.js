import React from "react";
import { Grid, Text } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";

const ReviewDone = () => {
  document.body.style.overscrollBehavior = "none";
  return (
    <Grid column padding="167px 0px 0px 0px" bg="white" height="auto">
      <img src="./img/seuchin_yellow.png" style={{ width: "150px" }} alt="dss" />
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

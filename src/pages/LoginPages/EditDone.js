import React from "react";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";

const EditDone = () => {
  return (
    <Grid column margin="200px 0px">
      <Text size="24px">
        프로필 수정이 <br />
        완료되었어요:)
      </Text>
      <FooterMenu next path="/mypage" text="다음" />
    </Grid>
  );
};

export default EditDone;

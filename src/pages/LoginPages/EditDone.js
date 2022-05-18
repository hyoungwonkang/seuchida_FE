import React from "react";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";

const EditDone = () => {
  return (
    <Grid column margin="167px auto 0px auto">
      <img src="./img/seuchin.png" />
      <Text size="24px" bold>
        프로필 수정이 <br />
        완료되었어요:)
      </Text>
      <FooterMenu next path="/mypage" text="확인" />
    </Grid>
  );
};

export default EditDone;

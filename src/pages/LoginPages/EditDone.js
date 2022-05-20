import React from "react";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useHistory } from "react-router-dom";

const EditDone = () => {
  const history = useHistory();

  // 로컬 지우기
  const remove = () => {
    // localStorage.setItem("profile", profile);
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    history.replace("/mypage");
  };

  return (
    <Grid column margin="167px auto 0px auto">
      <img src="./img/seuchin.png" />
      <Text size="24px" bold>
        프로필 수정이 <br />
        완료되었어요:)
      </Text>
      <FooterMenu next event={remove} text="확인" />
    </Grid>
  );
};

export default EditDone;

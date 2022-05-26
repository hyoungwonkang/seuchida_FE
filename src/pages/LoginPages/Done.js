import React from "react";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useHistory } from "react-router-dom";

const Done = () => {
  const history = useHistory();
  document.body.style.overscrollBehavior = "none";

  // 로컬 지우기
  const remove = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    localStorage.removeItem("userInterest");
    history.replace("/main");
  };

  return (
    <Grid column padding="167px 0px 0px 0px">
      <img src="./img/seuchin.png" />
      <Text size="24px" bold>
        프로필 작성이 <br />
        완료되었어요:)
      </Text>
      <Text size="16px" color="gray" margin="0px 0px 5px 0px ">
        나의 가장 가까운 스친을
      </Text>
      <Text size="16px" color="gray" margin="0px">
        찾으러 떠나 볼까요?
      </Text>
      <FooterMenu next event={remove} text="확인" />
    </Grid>
  );
};

export default Done;

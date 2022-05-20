import React from "react";
import Button from "../elements/Button";
import { Grid, Text } from "../elements/Index";
import styled from "styled-components";

const PostDone = () => {
  document.body.style.overscrollBehavior = "none";
  const setDone = () => {
    window.location.href = "/main";
  };
  return (
    <Wrap>
      <img src="/img/seuchin.png" alt="seuchin" />
      <Grid>
        <Text bold margin="280px 0px 10px 44px" size="24px">
          모집 등록이 완료되었습니다!
        </Text>
        <Text margin="0px 0px 0px 80px" size="16px" color="grey">
          내가 만든 모임은 마이페이지에서
        </Text>
        <Text margin="0px 0px 40px 132px" size="16px" color="grey">
          확인할 수 있어요
        </Text>
        <Button margin="0px 0px 0px 24px" _onClick={setDone} text="확인" />
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  margin: 80px 0px 0px 0px;
  img {
    position: absolute;
    right: 120px;
    top: 180px;
  }
`;

export default PostDone;

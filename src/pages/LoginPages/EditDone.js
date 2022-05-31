import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useHistory } from "react-router-dom";

const EditDone = () => {
  const history = useHistory();

  // 로컬 지우기
  const remove = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    localStorage.removeItem("userInterest");
    history.replace("/mypage");
  };

  return (
    <>
      <Container>
        <Grid column padding="167px 0px 0px 0px">
          <img alt="seuchin" src="/img/seuchin.png" />
          <Text size="24px" bold>
            프로필 수정이 <br />
            완료되었어요:)
          </Text>
          <FooterMenu next event={remove} text="확인" />
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 0px;
`;

export default EditDone;

import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

const signupDone = () => {
  return (
    <Box>
      <h2>
        회원가입이 <br />
        완료되었어요:)
      </h2>
      <Next
        onClick={() => {
          history.push("/main");
        }}
      >
        내 동네 설정하고 시작하기
      </Next>
      <Next
        onClick={() => {
          history.push("/main");
        }}
      >
        그냥 둘러보기
      </Next>
    </Box>
  );
};
const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Next = styled.button`
  width: 350px;
  height: 45px;
  margin-top: 10%;
  border: none;
  background: gray;
`;
export default signupDone;

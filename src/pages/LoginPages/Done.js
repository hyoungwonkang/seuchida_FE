import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { Button } from "../../elements/Index";

const Done = () => {
  return (
    <Box>
      <h2>
        프로필 작성이 <br />
        완료되었어요:)
      </h2>
      <Button
        onClick={() => {
          history.push("/main");
        }}
      >
        확인
      </Button>
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
export default Done;

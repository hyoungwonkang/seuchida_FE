import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements/Index";

const EndCard = () => {
  return (
    <>
      <Grid
        border="1px solid gray"
        width="342px"
        height="168px"
        br="12px"
        padding="20x"
      >
        <Text> * 모집완료</Text>
      </Grid>
    </>
  );
};

export default EndCard;

const Container = styled.section`
  width: 233px;
  height: 155px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  /* background-color: #f5f5f5; */
`;

const Box = styled.div`
  align-items: center;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Desc = styled.div`
  padding: 15px 0px;
`;

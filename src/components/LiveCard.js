import React from "react";
import styled from "styled-components";
const LiveCard = (props) => {
  return (
    <>
      <Container>거리 / 작성시간 제목 내용 성별 나이</Container>
    </>
  );
};

export default LiveCard;

const Container = styled.section`
  max-width: 250px;
  border: 1px solid black;
  height: 200px;
`;

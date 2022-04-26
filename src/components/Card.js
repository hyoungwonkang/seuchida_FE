import React from "react";
import styled from "styled-components";

const Card = (props) => {
  return (
    <Container>
      <TextBox>
        <div style={{marginBottom:"12px"}}>
          <BoldTitle >· 모집중</BoldTitle>
          <span>배드민턴 칠 사람!</span>
        </div>

        <div>
    <StatusBox>모두참여가능</StatusBox>
    <StatusBox>오늘</StatusBox>
    <StatusBox>2/3명 참여</StatusBox>

        </div>
        <SmallFont>500m | 1분전</SmallFont>
      </TextBox>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  height: 15vh;
  background-color: white;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;

`;

const TextBox = styled.div`
padding: 24px 40px;
align-items: center;

`

const BoldTitle = styled.span`
/* font-weight: 900; */
font-weight: bold;
font-size: 17px;
margin-right: 15px;
`

const StatusBox = styled.span`
  background-color: #E5E5E5;
  border-radius: 30px;
  margin-right: 8px;
  padding: 1px 10px;
  font-size: 12px;

`

const SmallFont = styled.div`
  color: #787878;
  font-size: 11px;
  float: right;
  margin-top: 5px;
`;
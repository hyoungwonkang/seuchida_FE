import React from "react";
import styled from "styled-components";
import { Card, LCslider } from "../components/index";
import FooterMenu from "../shared/FooterMenu";
import RCslider from "../components/RCslider";
const Main = () => {
  return (
    <>
      <Container>
        {/* 라이브 카드  */}
        <TopLive>
          <WellcomeBox>
            <Wellcome>
              <User>user_name</User>님<br />
              방금 개설된 가까운 <br />
              운동 매칭이에요!
            </Wellcome>
          </WellcomeBox>
          <LCslider />
        </TopLive>
        {/* 여기여기 붙어라 */}
        <ListBox>
          <TitleBox>
            <Title>여기여기 붙어라</Title> <Title>&gt;</Title>
          </TitleBox>
          <CardBox>
            <Card />
          </CardBox>
          <CardBox>
            <Card />
          </CardBox>

          <CardBox>
            <Card />
          </CardBox>
        </ListBox>
        {/* 스친 운동 한줄평 */}
        <ReviewBox>
          <TitleBox>
            <Title>스친 운동 한줄평</Title> <Title>&gt;</Title>
          </TitleBox>
        
            <RCslider /> 
        </ReviewBox>
        {/* 푸터 */}
        <FooterMenu />
      </Container>
    </>
  );
};

export default Main;

const Container = styled.section`
  background-color: #e9e9e9;
`;

//라이브 카드
const TopLive = styled.section`
  max-height: 80vh;
  min-height: 535px;
`;

const WellcomeBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 40px;
`;

const User = styled.div`
  display: inline;
  color: #222222;
`;

const Wellcome = styled.div`
  color: rgba(123, 123, 123, 1);
`;

// --라이브 카드

// 여기여기 붙어라

const ListBox = styled.section``;

const CardBox = styled.div`
  margin-top: 8px;
`;
const TitleBox = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 25px;
`;
//-- 여기여기 붙어라 

// 스친 운동 한줄평

const ReviewBox = styled.section`
background-color: white;
`
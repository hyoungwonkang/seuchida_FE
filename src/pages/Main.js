import React from "react";
import styled from "styled-components";
import { Card, LCslider, RCslider, ECslider } from "../components/index";
import FooterMenu from "../shared/FooterMenu";

const Main = () => {
  return (
    <>
      <Container>
        {/* 라이브 카드  */}
        <TopLive>
          <WellcomeBox>
            <Wellcome>
              user_name님
              <br />
              방금 개설된 가까운 <br />
              <Sports>배드민턴</Sports> 매칭이에요!
            </Wellcome>
          </WellcomeBox>
          <LCslider />
        </TopLive>

         {/* 스친 운동 한줄평 */}
         <ReviewBox>
          <TitleBox>
            <Title>스친 운동 후기</Title> <Title>&gt;</Title>
          </TitleBox>

          <RCslider />
        </ReviewBox>
     
        {/* 여기여기 붙어라 */}
          <TitleBox>
            <Title>여기여기 붙어라</Title> <Title>&gt;</Title>
          </TitleBox>
        <ListBox>
          <CardBox>
            <Card MainCard />
          </CardBox>
          <CardBox>
            <Card MainCard />
          </CardBox>
          <CardBox>
            <Card MainCard />
          </CardBox>
        </ListBox>
       
        {/* 푸터 */}
      </Container>
        <FooterMenu />
    </>
  );
};

export default Main;

const Container = styled.section`
  background-color: #e9e9e9;
`;

//라이브 카드
const TopLive = styled.section`
  max-height: 60vh;
  min-height: 500px;
`;

const WellcomeBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 40px;
`;

const Sports = styled.div`
  display: inline;
  color: #222222;
`;

const Wellcome = styled.div`
  color: rgba(123, 123, 123, 1);
`;

// --라이브 카드

//참여한 운동매칭
const EndBox = styled.div`
background-color : white

`;

// 여기여기 붙어라

const ListBox = styled.section`
background-color: white;
padding-bottom: 80px;



`;

const CardBox = styled.div`
  justify-content: center;
  display: flex;
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
`;

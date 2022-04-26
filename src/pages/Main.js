import React from "react";
import styled from "styled-components";
import {Card,LCslider} from "../components/index"
const Main = () => {
  return (

      <>
      
      <WellcomeBox>
        <Wellcome>
          <User>user_name</User>님<br />
          방금 개설된 가까운 <br />
          운동 매칭이에요!
        </Wellcome>
      </WellcomeBox>


      <LCslider/>
      <Card/>



      7 / 메인 랜딩페이지 /실시간 카드 LiveCard 컴포 /오늘의 챌린지 카드
      Challenge 컴포 /여기여기 붙어라 Card 컴포 3개만 map
</>
  );
};

export default Main;


const WellcomeBox = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 40px;
`;

const User = styled.div`
  display: inline;
  color: #222222;
`;

const Wellcome = styled.div`
  color: rgba(123, 123, 123, 1);
`;


const LiveCardBox = styled.div`
  display: flex;
  

`
import React from "react";
import styled from "styled-components";
const LiveCard = (props) => {
  return (
    <>
      <Container>
        <Box>
          <Profile src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg" />
          <LocaTime>
            <Location>
              <SmallFont>마크</SmallFont>
              <SmallFont>500m</SmallFont>
            </Location>
            <SmallFont>1분전</SmallFont>
          </LocaTime>

          {/* 카드 속 내용 */}
          <Title>배드민턴 칠 사람!</Title>
          <Desc>근처 근린공원에서 같이 배드민턴 쳐요~</Desc>
          <Line />
          <SmallFont>여/21세</SmallFont>
        </Box>
      </Container>
    </>
  );
};

export default LiveCard;

const Container = styled.section`
  padding: 15px;
  max-width: 250px;
  width: 55vw;
  border: 1px solid #e9e9e9;
  height: 200px;
  margin: 20px;
  font-size: 14px;
  border-radius: 25px;
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Profile = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  border-radius: 65px;
  z-index: 3;
  background-color: white;
  margin-left: 60px;
  top: 0px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const LocaTime = styled.div`
  justify-content: space-between;
  display: flex;
`;
const Location = styled.div`
  display: flex;
  flex-direction: row;
`;

const Box = styled.div`
  /* border: 1px solid black; */
  margin-top: 6px;
  padding: 15px;
`;

const SmallFont = styled.div`
  color: #787878;
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  padding: 16px 0px;
`;

const Desc = styled.div`
  font-size: 14px;
`;

const Line = styled.div`
  border-top: 1px solid gray;
  margin: 15px 0px;
`;

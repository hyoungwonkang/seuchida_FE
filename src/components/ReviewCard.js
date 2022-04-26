import React from "react";
import styled from "styled-components";
const ReviewCard = () => {
  return (
    <Container>
     {/* top */}
      <Box>
        <Profile>
          <ProfileImg src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/10/PS20100800026.jpg" />
          <User>아이유님</User>
        </Profile>
        <Desc>오늘 찐 잼이었음</Desc>
      </Box>
      <LocSports>
       
       {/* bottom */}
        <BottomBox>
          <div>
            <SmallFont style={{ marginRight: "5px" }}>콘</SmallFont>
            <SmallFont>인천문화경기장</SmallFont>
          </div>
          <div>
            <SmallFont style={{ marginRight: "5px" }}>콘</SmallFont>
            <SmallFont>배드민턴</SmallFont>
          </div>
        </BottomBox>
      </LocSports>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.section`
  width: 200px;
  height: 200px;
  border-radius: 30px;
  border: 2px solid #e9e9e9;
  margin-right: 20px;
`;

const Box = styled.div`
  align-items: center;
  padding: 20px;
`;
const BottomBox = styled.div`
  align-items: center;
  padding: 7px 20px;
`;

const SmallFont = styled.span`
  font-size: 12px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

const User = styled.span`
  margin-top: 10px;
`;

const Desc = styled.div`
  margin-top: 15px;
  height: 35px;
`;

const LocSports = styled.div`
  background-color: #f5f5f5;
  width: 200px;
  height: 65px;
  border-bottom-left-radius: 27px;
  border-bottom-right-radius: 27px;
`;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Image from "../elements/Image";
const ReviewCard = (props) => {
const  {review,_onClick} = props
  return (
    <Container onClick={_onClick}>
     {/* top */}
      <Box>
      <ReviewImg src={review?.reviewImg} />
      </Box>
      <LocSports>
       
       {/* bottom */}
        <BottomBox>
        <Profile>
          <ProfileImg src={review?.userImg} />
          <User>{review?.nickName}</User>
        </Profile>
        <Desc>{review?.content}</Desc>
        </BottomBox>
      </LocSports>
    </Container>
  ); 
};

export default ReviewCard;

const Container = styled.section`
  width: 208px;
  height: 236px;
  border-radius: 12px;
  border: 2px solid #e9e9e9;
  margin-right: 20px;
`;

const Box = styled.div`
  align-items: center;
  
  height: 130px;
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
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 12px 10px 0px 0px;
`;
const ReviewImg = styled.div`
  width: 208px;
  height: 130px;
 border-top-left-radius: 12px;
 border-top-right-radius: 12px;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0px 10px 0px 0px;
`;

const User = styled.span`
  margin-top: 10px;
  font-weight: bold;
`;

const Desc = styled.div`
  margin-top: 8px;
  line-height: 21px;
  font-size: 14px;
`;

const LocSports = styled.div`
  border-top:1px solid #f5f5f5;

`;
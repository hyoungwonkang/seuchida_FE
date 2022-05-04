import React, { useEffect } from "react";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import { ECslider } from "../components";
import { Grid, Image, Text } from "../elements/Index";

const NameCard = () => {
  return (
    <Grid column height="304px" brbottom bg="green" margin="0px">
      <Image
        shape="circle"
        size={60}
        src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
        margin="49px 0px 8px 0px"
      />
      <Text size="24px" margin="0px">
        🥇김미미
      </Text>

      <Grid row height="auto" margin="8px 0px 16px 0px">
        <Text br margin="0px 5px">
          자전거
        </Text>
        <Text br margin="0px 5px">
          배드민턴
        </Text>
        <Text br margin="0px 5px">
          볼링
        </Text>
      </Grid>

      <Text width="302px" color="gray" margin="0px 0px 45px 0px">
        운동에 관심이 많은 김미미 입니다~ 재미있게 같이 운동해요:)
      </Text>
    </Grid>
  );
};

const MyPage = () => {
  return (
    <>
      <Grid>
        <NameCard />
        <EndCardBox>
          <ECslider />
        </EndCardBox>

        <div>
          <div> 내가 쓴 글</div>
          <div> 내가 쓴 후기</div>
        </div>
      </Grid>

      <FooterMenu />
    </>
  );
};

export default MyPage;

const Wrap = styled.section`
  /* background-color: #f0f0f0; */
`;

const EndCardBox = styled.div`
  background-color: white;
  padding: 24px;
  margin-top: 20px;
`;

// const ProfileContainer = styled.section`
//   height: 369px;
//   margin-top: 112px;
//   /* border-bottom: 1px solid black; */
//   background-color: white;
//   border-bottom-left-radius: 30px;
//   border-bottom-right-radius: 30px;
//   padding: 0px 24px;
// `;

// const Profile = styled.div`
//   width: 71.68px;
//   height: 71.68px;
//   border-radius: 71.68px;
//   background-color: white;
//   background-image: url(${(props) => props.src});
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   margin-right: 46px;
// `;

// const Text = styled.span`
//   border: 1px solid #dddddd;
//   border-radius: 30px;
//   margin-right: 8px;
//   padding: 6px 10px;
//   font-size: 12px;
//   height: 26px;
// `;

const LevelName = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 13px;
  padding-bottom: 4px;
`;

const ImgName = styled.div`
  display: flex;
  flex-direction: row;
  padding: 36px 0px 24px 0px;
`;

const Level = styled.div`
  margin-right: 4px;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const DescBox = styled.div`
  padding-top: 32px;
`;

const LevelBar = styled.div``;
const LevelExp = styled.div``;
const BarBox = styled.div`
  padding-top: 32px;
`;

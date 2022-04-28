import React from "react";
import Header from "../shared/Header";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import { ECslider } from "../components";

const NameCard = () => {
  return (
    <>
      <ProfileContainer>
        <ImgName>
          <Profile src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMTlfMTA5/MDAxNTg0NTg3NzQ3Njkz.stGp6_LrBwQD7PfR2c650DXa2J-jj7IYIrg_ejtHTWEg.jATij9-vUGslq1mATuvYX-AgMvR6QqlxMzwFQT3Vzl4g.PNG.lyl_1917/DDD.PNG?type=w800" />
          <div>
            <LevelName>
              <Level> 계급</Level>
              <UserName> 김미미 </UserName>
            </LevelName>
            <div> 서울특별시 송파구 가락동</div>
          </div>
        </ImgName>

        <div>
          <StatusBox>자전거</StatusBox>
          <StatusBox>배드민턴</StatusBox>
          <StatusBox>볼링</StatusBox>
        </div>

        <DescBox>
          <div>운동에 관심이 많은 김미미 입니다. 재미있게 같이 운동해요 !!</div>
        </DescBox>

        <BarBox>
          <LevelExp>Green 레벨까지 6회</LevelExp>
          <LevelBar>대충 프로그레스바</LevelBar>
        </BarBox>
      </ProfileContainer>
    </>
  );
};

const MyPage = () => {
  return (
    <>
      <Header>
        <div>마이페이지</div>
      </Header>
      <Wrap>
        <NameCard />
        <EndCardBox>
          <ECslider />
        </EndCardBox>

        <div> 
        <div> 내가 쓴 글</div>
        <div> 내가 쓴 후기</div>


        </div>
      </Wrap>

      <FooterMenu />
    </>
  );
};

export default MyPage;

const Wrap = styled.section`
  background-color: #f0f0f0;
`;

const EndCardBox = styled.div`
background-color: white;
padding :24px;
margin-top: 20px;
`


const ProfileContainer = styled.section`
  height: 369px;
  margin-top: 112px;
  /* border-bottom: 1px solid black; */
  background-color: white;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 0px 24px;
`;

const Profile = styled.div`
  width: 71.68px;
  height: 71.68px;
  border-radius: 71.68px;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 46px;
`;

const StatusBox = styled.span`
  border: 1px solid #dddddd;
  border-radius: 30px;
  margin-right: 8px;
  padding: 6px 10px;
  font-size: 12px;
  height: 26px;
`;

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

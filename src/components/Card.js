import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button } from "../elements/Index";

const Card = (props) => {
  const { MainCard, DetailCard, center, _onClick, isMe } = props;

  function getDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  let distance = getDistance(
    center.lat,
    center.lng,
    props.latitude,
    props.longitude,
    "K"
  ).toFixed(1);

  if (MainCard) {
    return (
      <>
        <MainContainer>
          <div onClick={_onClick}>
            <TextBox style={{ paddingBottom: "5px" }}>
              <div style={{ marginBottom: "0px" }}>
                <BoldTitle>
                  · {props?.status === true ? "모집중" : "모집완료"}
                </BoldTitle>
                <BoldTitle>{props?.postTitle}</BoldTitle>
              </div>

              <div>
                <Desc>{props?.postDesc} </Desc>
              </div>
            </TextBox>

            <div>
              <Join
                style={{
                  justifyContent: "space-between",
                  padding: "0px 24px",
                }}
              >
                <ProfileBox>
                  {props?.nowMember.map((m, i) => {
                    return (
                      <Profile ket={m.id} src={m.memberImg} key={m.memberId} />
                    );
                  })}
                </ProfileBox>
                <SmallFont>{distance} km 떨어짐 | 1분전</SmallFont>
              </Join>
            </div>
          </div>
        </MainContainer>
      </>
    );
  }

  if (DetailCard)
    return (
      <Container style={{ border: "none" }}>
        <TitleBox style={{ background: "white", borderDisplay: "none" }}>
          <BoldTitle style={{ fontSize: "20px" }}>
            · {props?.status === true ? "모집중" : "모집완료"}
          </BoldTitle>
          <BoldTitle style={{ fontSize: "20px" }}>{props?.postTitle}</BoldTitle>
          {/* {isMe ? <Button is_delete>삭제</Button> : ""} */}
        </TitleBox>

        <TextBoxList>
          <DescBox style={{ margin: "0px 0px" }}>
            <Desc>{props?.postDesc}</Desc>
          </DescBox>

          <Join>
            <div> </div>

            <SmallFont>
              {distance} km 떨어짐 | {props.createdAt}
            </SmallFont>
          </Join>

          <Status style={{ background: "#F8F8F8", height: "120px" }}>
            <StatusIcon>
              <span>콘</span> <StatusBox>{props?.spot}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>콘</span> <StatusBox>{props?.postCategory}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>콘</span>
              <StatusBox>{props?.datemate}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>콘</span>
              <StatusBox>
                {props?.memberGender}, {props?.memberAge}
              </StatusBox>
            </StatusIcon>
          </Status>
        </TextBoxList>
      </Container>
    );

  return (
    <Grid _onClick={_onClick}>
      <Grid margin="auto" bg="#ddd" row height="46px" padding="0px 20px">
        <Text margin="0px 10px 0px 0px ">
          · {props?.status === true ? "모집중" : "모집완료"}
        </Text>
        <Text>{props?.postTitle}</Text>
        {/* {isMe ? <Button is_delete>삭제</Button> : ""} */}
      </Grid>

      <Grid width="342px" height="92px" padding="15px 20px">
        <Text margin="2px 0px">
          <span>콘</span>
          {props?.postCategory}
        </Text>
        <Text margin="2px 0px">
          <span>콘</span>
          {props?.datemate}
        </Text>
        <Text margin="2px 0px">
          <span>콘</span>
          {props?.memberGender}, {props?.memberAge}세
        </Text>
      </Grid>
      <hr />

      <Grid width="342px" height="92px" padding="10px 20px">
        <Text>{props?.postDesc}</Text>
      </Grid>

      <Grid row margin="auto" padding="0px 20px">
        <Image src={props?.userImg} />
        <Text size="14px">{props?.nickName}</Text>

        <Text size="12px" margin="0px 0px 0px 160px">
          {distance} km 떨어짐 | 1분전
        </Text>
      </Grid>
    </Grid>
  );
};

export default Card;

const MainContainer = styled.section`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 342px;
  height: 168px;
  margin-bottom: 14px;
  cursor: pointer;
  z-index: 3;
`;

const Container = styled.section`
  width: 100%;
  min-height: 150px;
  background-color: white;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
`;

const TitleBox = styled.div`
  background-color: #e9e9e9;
  width: 100%;
  height: 46px;
  align-items: center;
  display: flex;
  padding: 0px 24px;
`;

const Desc = styled.div`
  font-size: 17px;
  padding-top: 4px;
  height: 60px;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e9e9e9;
  padding: 0px 24px;
  height: 92px;
  justify-content: center;
`;

const DescBox = styled.div`
  margin: 12px 0px;
  min-height: 48px;
  padding: 0px 24px;
`;

const Join = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 24px 12px 24px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StatusIcon = styled.div`
  display: flex;
  flex-direction: row;
`;

const Profile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 5px;
  margin-right: 5px;
`;

const TextBox = styled.div`
  padding: 20px 24px 24px 24px;
  align-items: center;
`;
const TextBoxList = styled.div`
  align-items: center;
`;

const BoldTitle = styled.span`
  /* font-weight: 900; */
  font-weight: bold;
  font-size: 17px;
  margin-right: 15px;
`;

const StatusBox = styled.span`
  font-size: 14px;
  margin-left: 8px;
`;

const SmallFont = styled.div`
  color: #787878;
  font-size: 12.5px;
  margin-top: 16px;
`;

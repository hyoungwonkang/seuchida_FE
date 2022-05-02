import React from "react";
import styled from "styled-components";

const Card =(props) => {
const { MainCard, DetailCard, center} = props

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

let distance = getDistance(center.lat, center.lng, props.latitude, props.longitude, "K").toFixed(1)


  if (MainCard) {
    return (
      <>
        <MainContainer>
          <div>
            <TextBox style={{paddingBottom:"5px"}}>
              <div style={{ marginBottom: "6px" }}>
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
                    return <Profile src={m.memberImg} key={m.memberId} />;
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

  return (
    <Container>
        <TitleBox>
          <BoldTitle>
            · {props?.status === true ? "모집중" : "모집완료"}
          </BoldTitle>
          <BoldTitle>{props?.postTitle}</BoldTitle>
        </TitleBox>
    
    
    
    
      <TextBoxList>
      <Status> 
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
              {props?.memberGender}, {props?.memberAge}세
            </StatusBox>        
          </StatusIcon>
        </Status>

        <DescBox>
          <Desc>{props?.postDesc}</Desc>
        </DescBox>

        <div>
          <Join>
            {DetailCard ? null : (
              <ProfileBox>
               <Profile src={props?.userImg}/>
               <SmallFont style={{marginLeft:"8px"}}>{props?.nickName}</SmallFont>
              </ProfileBox>
            )}

            <SmallFont>500m 떨어짐| 1분전</SmallFont>
          </Join>
        </div>
      </TextBoxList>
    </Container>
  );
};

export default Card;

const MainContainer = styled.section`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 342px;
  height: 168px;
  margin-bottom: 14px;
`;

const Container = styled.section`
  width: 100%;
  min-height: 150px;
  background-color: white;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

const TitleBox = styled.div`
background-color:  #e9e9e9;
width: 100%;
height: 46px;
align-items: center;
display: flex;
padding: 0px 24px;
`


const Desc = styled.div`
  font-size: 17px;
  padding-top: 4px;
  height: 50px;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid  #e9e9e9;
  padding : 0px 24px ;
  height: 92px;
  justify-content: center;
`;

const DescBox = styled.div`
  margin: 12px 0px;
  min-height: 48px;
  padding :0px 24px;
`;

const Join = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 24px 8px 24px;
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

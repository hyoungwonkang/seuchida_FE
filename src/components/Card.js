import React from "react";
import styled from "styled-components";
import { BiDumbbell } from "react-icons/bi";
import { AiFillCalendar } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import moment from "moment";
import "moment/locale/ko";

const Card = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { MainCard, DetailCard, center, _onClick, Map } = props;

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

  // 작성 시간
  const time = moment(props.createdAt).fromNow();

  if (MainCard) {
    return (
      <>
        <MainContainer>
          <div onClick={_onClick}>
            <TextBox style={{ paddingBottom: "5px", height: "85px" }}>
              <div style={{ marginBottom: "0px" }}>
                <BoldTitle style={{ color: "#FF6B52" }}>
                  · {props?.status === true ? "모집중" : "모집완료"}
                </BoldTitle>
                <BoldTitle>{props?.postTitle}</BoldTitle>
              </div>

              <MainDesc>{props?.postDesc} </MainDesc>
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
                    if (i < 3) return <Profile key={i} src={m.memberImg} />;
                  })}
                  {props.nowMember.length > 3 ? (
                    <CountM>+{props.nowMember.length - 3}</CountM>
                  ) : null}
                </ProfileBox>
                <SmallFont>
                  {distance} km 떨어짐 | {time}
                </SmallFont>
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
          <BoldTitle style={{ fontSize: "20px", color:"#FF6B52" }}>
            · {props?.status === true ? "모집중" : "모집완료"}
          </BoldTitle>
          <BoldTitle style={{ fontSize: "20px" }}>{props?.postTitle}</BoldTitle>
        </TitleBox>

        <TextBoxList>
          <DescBox style={{ margin: "0px 0px" }}>
            <DetailDesc>{props?.postDesc}</DetailDesc>
          </DescBox>

          <Join>
            <div> </div>

            <SmallFont>
              {distance} km 떨어짐 | {time}
            </SmallFont>
          </Join>

          <Status style={{ background: "#F8F8F8", height: "120px" }}>
            <StatusIcon>
              <span>
                <MdPlace color="#787878" />
              </span>
              <StatusBox>{props?.spot}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>
                <BiDumbbell color="#787878" />
              </span>
              <StatusBox>{props?.postCategory}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>
                <AiFillCalendar color="#787878" />
              </span>
              <StatusBox>{props?.datemate}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>
                <FaPen color="#787878" size="14px" />
              </span>
              <StatusBox>
                {props?.memberGender}, {props?.memberAge}
              </StatusBox>
            </StatusIcon>
          </Status>
        </TextBoxList>
      </Container>
    );

  if (Map) {
    return (
      <Container style={{ border: "none" ,overflowX: 'hidden'}} onClick={_onClick}>
        <TitleBox style={{ backgroundColor: "white", paddingTop: "5px" }}>
          <BoldTitle style={{ color: "#FF6B52" }}>
            · {props?.status === true ? "모집중" : "모집완료"}
          </BoldTitle>
          <BoldTitle>{props?.postTitle}</BoldTitle>
        </TitleBox>

        <TextBoxList>
          <Status style={{ paddingBottom: "10px", border:"none"  }}>
            <StatusIcon>
              <span>
                <BiDumbbell color="#787878" />
              </span>
              <StatusBox>{props?.postCategory}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>
                <AiFillCalendar color="#787878" />
              </span>
              <StatusBox>{props?.datemate}</StatusBox>
            </StatusIcon>
            <StatusIcon>
              <span>
                <FaPen color="#787878" size="14px" />
              </span>
              <StatusBox>
                {props?.memberGender}, {props?.memberAge}
              </StatusBox>
            </StatusIcon>
          </Status>

          <Join style={{ borderBottom: "1px solid #e9e9e9"}}>
            <ProfileBox style={{ paddingBottom: "3px" }}>
              <Profile src={props?.userImg} />
              <SmallFont style={{ margin: "12px 0px 0px 8px" }}>
                {props?.nickName}
              </SmallFont>
            </ProfileBox>

            <SmallFont style={{ marginTop: "12px" }}>
              {distance} km 떨어짐 | {time}
            </SmallFont>
          </Join>
        </TextBoxList>
      </Container>
    );
  }

  return (
    <Container style={{ border: "none" }} onClick={_onClick}>
      <TitleBox style={{ backgroundColor: "#F1F1F5" }}>
        <BoldTitle style={{ color: "#FF6B52" }}>
          · {props?.status === true ? "모집중" : "모집완료"}
        </BoldTitle>
        <BoldTitle>{props?.postTitle}</BoldTitle>
      </TitleBox>

      <TextBoxList>
        <Status>
          <StatusIcon>
            <span>
              <BiDumbbell color="#787878" />
            </span>
            <StatusBox>{props?.postCategory}</StatusBox>
          </StatusIcon>
          <StatusIcon>
            <span>
              <AiFillCalendar color="#787878" />
            </span>
            <StatusBox>{props?.datemate}</StatusBox>
          </StatusIcon>
          <StatusIcon>
            <span>
              <FaPen color="#787878" size="14px" />
            </span>
            <StatusBox>
              {props?.memberGender}, {props?.memberAge}
            </StatusBox>
          </StatusIcon>
        </Status>

        <DescBox>
          <ListDesc>{props?.postDesc}</ListDesc>
        </DescBox>

        <div>
          <Join>
            <ProfileBox style={{ paddingBottom: "3px" }}>
              <Profile
                src={props?.userImg}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              />
              <SmallFont style={{ margin: "12px 0px 0px 8px" }}>
                {props?.nickName}
              </SmallFont>
            </ProfileBox>

            <SmallFont style={{ marginTop: "12px" }}>
              {distance} km 떨어짐 | {time}
            </SmallFont>
          </Join>
        </div>
      </TextBoxList>
      <Modal open={isOpen}>
        <ModalData
          post={props.nowMember}
          onClose={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      </Modal>
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
const DetailDesc = styled.div`
  font-size: 17px;
  padding-top: 4px;
  min-height: 60px;
`;
const ListDesc = styled.div`
  font-size: 17px;
  padding-top: 4px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.3em;
  height: 3.9em;
`;
const MainDesc = styled.div`
  font-size: 17px;
  padding-top: 8px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.3em;
  height: 2.4em;
  color: #585858;
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

const CountM = styled.span`
  margin-top: 10px;
  color: #787878;
  font-size: 14px;
`;

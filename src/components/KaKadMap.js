import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Grid, Text, Image } from "../elements/Index";
import styled from "styled-components";
import { HiOutlineX } from "react-icons/hi";
import { history } from "../redux/configStore";

function KakaoMap(props) {
  const { MainMap, UserLoca, post, _onClick } = props;

  if (MainMap) {
    return (
      <>
        <Map
          center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
          style={{ width: "100%", height: "100vh" }}
          onClick={_onClick}
          level={7}
        >
          <MapMarker // 마커를 생성합니다
            position={{ lat: UserLoca.lat, lng: UserLoca.lng }}
            image={{
              src: "./img/mypoint.png", // 마커이미지의 주소입니다
              size: {
                width: 51,
                height: 70,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
          {post?.map((position, index) => (
            <EventMarkerContainer
              {...position}
              key={`${position.postId} + ${position.latitude}`}
            />
          ))}
        </Map>
      </>
    );
  }

  return (
    <>
      <DetailMap>
        <Map
          center={{ lat: props?.latitude, lng: props?.longitude }}
          style={{ width: "100%", height: "200px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: props?.latitude, lng: props?.longitude }}
            image={{
              src: "../img/postpoint.png",
              size: {
                width: 38,
                height: 53,
              },
            }}
          ></MapMarker>
        </Map>
      </DetailMap>
    </>
  );
}

export default KakaoMap;

const DetailMap = styled.div`
  padding: 0px 24px 130px 24px;
`;

const Box = styled.div`
  position: absolute;
  padding: 5px;
  top: -185px;
  left: -78px;
  background-color: white;
  padding: 15px 5px;
  height: 100px;
  border-radius: 12px;
  z-index: 1000;
  box-shadow: 1px 2px 8px -2px;
`;

const EventMarkerContainer = (props) => {
  const [isclick, setIsClicked] = React.useState(false);

  const level = [
    {
      id: 1,
      level: 1,
      image: <Image size={19} src="../img/badge/red.png" />,
    },
    {
      id: 2,
      level: 2,
      image: <Image size={19} src="../img/badge/orange.png" />,
    },
    {
      id: 3,
      level: 3,
      image: <Image size={19} src="../img/badge/yellow.png" />,
    },
    {
      id: 4,
      level: 4,
      image: <Image size={19} src="../img/badge/green.png" />,
    },
    {
      id: 5,
      level: 5,
      image: <Image size={19} src="../img/badge/skyblue.png" />,
    },
    {
      id: 6,
      level: 6,
      image: <Image size={19} src="../img/badge/blue.png" />,
    },
    {
      id: 7,
      level: 7,
      image: <Image size={19} src="../img/badge/purple.png" />,
    },
  ];

  return (
    <React.Fragment key={props._id}>
      <MapMarker
        key={props._id}
        position={{ lat: props.latitude, lng: props.longitude }}
        onClick={() => setIsClicked(true)}
        image={{
          src: "../img/postpoint.png",
          size: {
            width: 33,
            height: 48,
          },
        }}
      />
      <CustomOverlayMap
      
        position={{ lat: props.latitude, lng: props.longitude }} // 마커를 표시할 위치
      >
        {isclick && (
          <Box>
            <span style={{ float: "right", marginRight: "8px" }}>
              <HiOutlineX size={17} onClick={() => setIsClicked(false)} />
            </span>
            <div
              onClick={() => {
                history.push(`/postdetail/${props._id}`);
              }}
            >
              <RowBox>
                <Image src={props.userImg}  />
                <div style={{marginLeft:" 6px"}}>
                  <Owner>{props.nickName} </Owner>
                  <Status>
                    {props.status === true ? "모집중" : "모집완료"}
                  </Status>
                </div>
                {level.map((v, i) => {
                  if (v.level == props.level)
                    return <div key={v.id}>{v.image}</div>;
                  if (props.level >= 7)
                    return <div key={v.id}>{v[6]?.image}</div>;
                })}
              </RowBox>
            </div>

            <Desc>{props.postTitle}</Desc>
          </Box>
        )}
      </CustomOverlayMap>
    </React.Fragment>
  );
};

const Desc = styled.div`
  font-size: 14px;
  width: 140px;
  height: 60px;
  padding: 4px 6px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border-top: 1px solid #c4c4c4; */
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  padding: 8px;
`;
const Owner = styled.div`
  font-size: 14px;
  
  line-height: 6px;
  padding-top: 6px;
`;

const Status = styled.span`
  font-size: 10px;
  color: #c4c4c4;
`;

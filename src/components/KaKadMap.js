import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useMap } from "react-kakao-maps-sdk";
import Image from "../elements/Image";

function KakaoMap(props) {
  const { MainMap, UserLoca, post, _onClick } = props;

  if (MainMap) {
    return (
      <Map
        center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        style={{ width: "100%", height: "600px" }}
        onClick={_onClick}
        level={7}
      >
        <MapMarker // 마커를 생성합니다
          position={{ lat: UserLoca.lat, lng: UserLoca.lng }}
          image={{
            src: "./img/isMe.png", // 마커이미지의 주소입니다
            size: {
              width: 42,
              height: 59,
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
          <>
            <EventMarkerContainer
              {...position}
              key={`${position.PostId} + ${position.latitude}`}
            />
          </>
        ))}
      </Map>
    );
  }
  // <Image src="./img/blue.png" />
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
  padding: 10px;
  top: -170px;
  left: -80px;
  background-color: white;
  width: 173px;
  height: 126px;
  border-radius: 12px;
  z-index: 1000;
  box-shadow: 1px 1px 6px -2px;
`;
const Close = styled.button``;

const EventMarkerContainer = (props) => {
  const [isclick, setIsClicked] = React.useState(false);
  return (
    <>
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
            <div>
              <Image src={props.userImg} size={36}></Image>
              {props.nickName}
            </div>{" "}
            {props.postDesc}
            <Close className="close" onClick={() => setIsClicked(false)}>
              X
            </Close>
          </Box>
        )}
      </CustomOverlayMap>
    </>
  );
};

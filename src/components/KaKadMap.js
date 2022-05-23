import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Grid, Text, Image } from "../elements/Index";
import styled from "styled-components";
import { useMap, kakao } from "react-kakao-maps-sdk";
import { HiOutlineX } from "react-icons/hi";
import { history } from "../redux/configStore";


function KakaoMap(props) {
  const { MainMap, UserLoca, post, _onClick } = props;
  const [state, setState] = React.useState({
    // 지도의 초기 위치
    center: { lat: UserLoca.lat, lng: UserLoca.lng },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  })
  console.log(state)
  if (MainMap) {
    return (
      <>
      <Mebtn button
            onClick={() =>
              setState({
                center: { lat: UserLoca.lat, lng: UserLoca.lng },
                isPanto: true,
              })
            } >sdfseww</Mebtn>
      <Map
        center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        style={{ width: "100%", height: "100vh" }}
        onClick={_onClick}
        level={7}
      >
       
        <MapMarker // 마커를 생성합니다
          position={{ lat: UserLoca.lat, lng: UserLoca.lng }}
          center={state.center}
          isPanto={state.isPanto}
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
              key={`${position.PostId} + ${position.latitude}`}
            />
         
        ))}
      </Map></>
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

const Mebtn = styled.div`
background-color: black;
position: fixed;
bottom: 120px;
z-index: 99;
`

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

  const level = [
    { id: 1, level: 1, image: <Image src="../img/badge/red.png" /> },
    { id: 2, level: 2, image: <Image src="../img/badge/orange.png" /> },
    { id: 3, level: 3, image: <Image src="../img/badge/yellow.png" /> },
    { id: 4, level: 4, image: <Image src="../img/badge/green.png" /> },
    { id: 5, level: 5, image: <Image src="../img/badge/skyblue.png" /> },
    { id: 6, level: 6, image: <Image src="../img/badge/blue.png" /> },
    { id: 7, level: 7, image: <Image src="../img/badge/purple.png" /> },
  ];

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
          <Grid
            bg="white"
            padding="15px"
            br="10px"
            width="173px"
            height="126px"
          >
            <Grid row justify="right" height="15px">
              <HiOutlineX size={20} onClick={() => setIsClicked(false)} />
            </Grid>
            <Grid
              height="30px"
              _onClick={() => {
                history.push(`/postdetail/${props._id}`);
              }}
            >
              <Grid row>
                {level.map((v, i) => {
                  if (v.level == props.level) return v.image;
                })}
                <Text size="14px" bold>
                  {props.nickName}
                </Text>
              </Grid>
              <Desc>{props.postDesc}</Desc>
            </Grid>
          </Grid>
        )}
      </CustomOverlayMap>
    </>
  );
};

const Desc = styled.div`
  font-size: 14px;
  width: 120px;
  /* min-height: 100px; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
  /* word-wrap: break-word; */
  line-height: 2em;
  height: 2.4em;
  /* white-space: nowrap; */
`;

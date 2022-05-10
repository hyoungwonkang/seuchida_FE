import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useMap } from "react-kakao-maps-sdk";
import Image from "../elements/Image";
function KakaoMap(props) {
  const { MainMap, UserLoca, post,_onClick} = props;

  if (MainMap) {
    return (
      <Map
        center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        style={{ width: "100%", height: "600px" }}
        onClick={_onClick}
        level={7}
      >
        <MapMarker
          position={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        ></MapMarker>
        {post?.map((position, index) => (
          <>
              <EventMarkerContainer {...position}/>
          </>
        ))}
      </Map>
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
  top: -170px;
  left: -80px;
  background-color: white;
  width: 173px;
  height: 126px;
  border-radius: 12px;
  z-index: 9999;
  box-shadow: 1px 1px 6px -2px;
`;
const Close = styled.button``;


const EventMarkerContainer = (props) => {
  const [isclick, setIsClicked] = React.useState(false)
  return (
    <>
     <MapMarker 
              key={props._id}
              position={{ lat:props.latitude, lng:props.longitude }}
              onClick={() => setIsClicked(true)}  
            />
  <CustomOverlayMap
      position={{lat:props.latitude, lng:props.longitude}} // 마커를 표시할 위치
        
    >         
               { isclick&& <Box>
                 <div><Image src ={props.userImg}
                  size ={36}></Image>{props.nickName}</div> {props.postDesc}
                  <Close className="close" onClick={() => setIsClicked(false)}>
                    X
                  </Close>
                </Box>}
            
    </CustomOverlayMap></>
  )
}
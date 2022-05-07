import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useMap } from "react-kakao-maps-sdk";
function KakaoMap(props) {
  const { MainMap, UserLoca, post} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedMarker, setSeleteMarker] = React.useState()



  if (MainMap) {
    return (
      <Map
        center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        style={{ width: "100%", height: "600px" }}
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
  top: -140px;
  left: -70px;
  background-color: white;
  width: 150px;
  height: 100px;
  border-radius: 12px;
  z-index: 30;
`;
const Close = styled.button``;


const EventMarkerContainer = ({latitude, longitude,  _id ,spot}) => {
  const [isclick, setIsClicked] = React.useState(false)
  return (
    <>
     <MapMarker 
              key={_id}
              position={{ lat:latitude, lng:longitude }}
              onClick={() => setIsClicked(true)}  
            />
  <CustomOverlayMap
      position={{lat:latitude, lng:longitude}} // 마커를 표시할 위치
        
    >         
               { isclick&& <Box>
                  {spot}
                  <Close className="close" onClick={() => setIsClicked(false)}>
                    X
                  </Close>
                </Box>}
            
    </CustomOverlayMap></>
  )
}
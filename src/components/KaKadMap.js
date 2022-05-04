import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

function KakaoMap(props) {
  const { MainMap, UserLoca, post } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState();

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
            <MapMarker
              key={position._id}
              position={{ lat: position.latitude, lng: position.longitude }}
              onClick={() => setIsOpen(true)}
            />

            {isOpen && (
              <CustomOverlayMap
                position={{ lat: position.latitude, lng: position.longitude }}
              >
                <Box>
                  {position.spot}
                  <Close className="close" onClick={() => setIsOpen(false)}>
                    X
                  </Close>
                </Box>
              </CustomOverlayMap>
            )}
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
`;
const Close = styled.button``;

export default KakaoMap;

import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function KakaoMap({ MainMap }) {
  //  const location = useSelector(state => state)

  if (MainMap) {
    return (
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '600px' }}
        level={3}
      >
        <MapMarker position={{ lat: 33.5563, lng: 126.79581 }}></MapMarker>
      </Map>
    );
  }

  return (
    <>
      <DetailMap>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: '100%', height: '200px' }}
          level={3}
        >
          <MapMarker position={{ lat: 33.5563, lng: 126.79581 }}></MapMarker>
        </Map>
      </DetailMap>
    </>
  );
}

const DetailMap = styled.div`
  padding: 0px 24px 130px 24px;
`;

export default KakaoMap;

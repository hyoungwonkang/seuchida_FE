<<<<<<< HEAD
import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

function KakaoMap({ MainMap }) {
  //  const location = useSelector(state => state)

  if (MainMap) {
    return (
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "600px" }}
        level={3}
      >
        <MapMarker position={{ lat: 33.5563, lng: 126.79581 }}></MapMarker>
      </Map>
    );
  }

=======
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function KakaoMap({ MainMap , UserLoca }) {
  if(MainMap){
  
  }





  if (MainMap) {
    return (
      <Map
        center={{ lat: UserLoca.lat, lng: UserLoca.lng }}
        style={{ width: '100%', height: '600px' }}
        level={3}
      >
        <MapMarker position={{ lat:  UserLoca.lat, lng: UserLoca.lng }}></MapMarker>
      </Map>
    );
  }

>>>>>>> 225ad7c1ca4139f1888020ef4db5b151cfafb0f4
  return (
    <>
      <DetailMap>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
<<<<<<< HEAD
          style={{ width: "100%", height: "200px" }}
=======
          style={{ width: '100%', height: '200px' }}
>>>>>>> 225ad7c1ca4139f1888020ef4db5b151cfafb0f4
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
<<<<<<< HEAD
=======



>>>>>>> 225ad7c1ca4139f1888020ef4db5b151cfafb0f4

export default KakaoMap;

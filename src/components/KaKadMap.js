import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function KakaoMap({ MainMap , UserLoca }) {
  // if(MainMap){
  //   function getDistance(lat1,lng1,lat2,lng2) {
  //     function deg2rad(deg) {
  //         return deg * (Math.PI/180)
  //     }
  
  //     var R = 6371; // Radius of the earth in km
  //     var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //     var dLon = deg2rad(lng2-lng1);
  //     var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //     var d = R * c; // Distance in km
  //     return d;
  // }
  // }





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

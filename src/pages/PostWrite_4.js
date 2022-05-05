import React, { useEffect, useState } from 'react';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import { Button, Text } from '../elements/Index';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FooterMenu from '../shared/FooterMenu';
import axios from 'axios';

// 지도에서 위치찍어서 포스트 올리기!
const PostWrite_4 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { kakao } = window;

  //지도
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  //검색
  const [locationObj, setLocationObj] = useState({});
  let fullAddress = '서울송파구방이동';
  axios
    .get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=1000`,
      {
        headers: { Authorization: 'KakaoAK 5498cafd5af35c66b35808e2b9e12971' },
      }
    )
    .then((res) => {
      const location = res.data.documents[0];
      setLocationObj({
        si: location.address.region_1depth_name,
        gu: location.address.region_2depth_name,
        dong: location.address.region_3depth_name,
        locationX: location.address.x,
        locationY: location.address.y,
      });
    });

  useEffect(() => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude; // 위도
      const lng = pos.coords.longitude; // 경도
      setState((prev) => ({
        ...prev,
        center: {
          lat,
          lng,
        },
        isLoading: false,
      }));

      const mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      const marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              let detailAddr = !!result[0].road_address
                ? '<div>도로명주소 : ' +
                  result[0].road_address.address_name +
                  '</div>'
                : '';
              detailAddr +=
                '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
              var address =
                result[0].address.region_1depth_name +
                ' ' +
                result[0].address.region_2depth_name;
              var spot = result[0].road_address?.building_name
                ? result[0].road_address.building_name
                : result[0].address.address_name;

              let content =
                '<div class="bAddr">' +
                '<span class="title">약속 장소</span>' +
                detailAddr +
                '</div>';
              // 마커를 클릭한 위치에 표시합니다
              // console.log(lat, lng);
              var latitude = mouseEvent.latLng.Ma;
              var longitude = mouseEvent.latLng.La;
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);
              if (spot) {
                dispatch(
                  postActions.postMap(address, spot, latitude, longitude)
                );
              }
            }
          }
        );
      });

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'idle', function () {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });

      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const infoDiv = document.getElementById('centerAddr');
        }
      }
    });
  }, []);

  return (
    <>
      <Container>
        <div>
          <Text>{locationObj.si}</Text>
          <Text>{locationObj.gu}</Text>
          <Text>{locationObj.dong}</Text>
        </div>
        현재위치
        <div
          id='map'
          // center={state.center}
          style={{
            width: '100%',
            height: '400px',
            // margin: '50px auto',
          }}
        ></div>
        <FooterMenu next path='/postwrite3' text='확인' />
      </Container>
    </>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

export default PostWrite_4;

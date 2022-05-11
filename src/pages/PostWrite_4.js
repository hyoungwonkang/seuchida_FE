import React, { useEffect, useRef, useState } from "react";
import { Button, Text, Grid } from "../elements/Index";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// 지도에서 위치찍어서 포스트 올리기!
const PostWrite_4 = (props) => {
  const history = useHistory();

  // 넘겨오는 값
  const memberAge = props?.location?.state?.memberAge;
  const memberGender = props?.location?.state?.memberGender;
  const maxMember = props?.location?.state?.maxMember;
  const postCategory = props?.location?.state?.postCategory;
  const postTitle = props?.location?.state?.postTitle;
  const postDesc = props?.location?.state?.postDesc;

  const { kakao } = window;

  let [address, setAddress] = useState();
  let [spot, setSpot] = useState();
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState();

  const [searchAddress, setSearchAddress] = useState();
  const [searchSpot, setSearchSpot] = useState();
  const [searchLatitude, setSearchLatitude] = useState();
  const [searchLongitude, setSearchLongitude] = useState();

  //지도
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  // 지도 검색 기능
  const [inputText, setInputText] = useState("");
  const [searchPlace, setSearchPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
    // setInputText('');
  };

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

      const mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //마커 표시

      const marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent) {
          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                let detailAddr = !!result[0].road_address
                  ? "<div>도로명주소 : " +
                    result[0].road_address.address_name +
                    "</div>"
                  : "";
                detailAddr +=
                  "<div>지번 주소 : " +
                  result[0].address.address_name +
                  "</div>";
                let home =
                  result[0].address.region_1depth_name +
                  " " +
                  result[0].address.region_2depth_name;
                let town = result[0].road_address?.building_name
                  ? result[0].road_address.building_name
                  : result[0].address.address_name;

                let content =
                  '<div class="bAddr" style="padding:5px;font-size:12px;>' +
                  '<span class="title">약속 장소</span>' +
                  detailAddr +
                  "</div>";
                // 마커를 클릭한 위치에 표시합니다
                let la = mouseEvent.latLng.Ma;
                let lo = mouseEvent.latLng.La;
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                infowindow.setContent(content);
                infowindow.open(map, marker);
                setAddress(home); //state값 넘겨주기
                setSpot(town);
                setLatitude(la);
                setLongitude(lo);

                setSearchAddress(home);
                setSearchSpot(town);
                setSearchLatitude(la);
                setSearchLongitude(lo);
              }
            },

            console.log(mouseEvent.latLng)
          );
        },
        []
      );

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      //검색

      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      let infowindow_search = new kakao.maps.InfoWindow({ zIndex: 1 });
      // 장소 검색 객체를 생성합니다
      let ps_search = new kakao.maps.services.Places();
      // 키워드로 장소를 검색합니다
      ps_search.keywordSearch(searchPlace, placesSearchCB);
      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            // bounds.extend(new kakao.maps.LatLng(data[i].address_name));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      }
      // 지도에 마커를 표시하는 함수입니다
      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        let marker_search = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker_search, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow_search.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>" +
              '<div style="padding:5px;font-size:12px;">도로명주소 : ' +
              place.road_address_name +
              "</div>" +
              '<div style="padding:5px;font-size:12px;">지번 주소 : ' +
              place.address_name +
              "</div>"
          );
          infowindow_search.open(map, marker_search);
          setSearchAddress(place.address_name);
          setSearchSpot(place.place_name);
          setSearchLatitude(place.y);
          setSearchLongitude(place.x);

          //인포윈도우 제거하기
          //표시한 마커를 누르면 검색한 마커의 인포윈도우가 없어집니다.
          let arr = [infowindow_search];

          function closeInfoWindow() {
            for (var i = 0; i < arr.length; i++) {
              arr[i].close();
            }
          }

          kakao.maps.event.addListener(marker, "click", function () {
            closeInfoWindow();
            infowindow.open(map, marker); //인포윈도우 열기
          });

          //검색한 마커 누르면 표시한 마커의 인포윈도우가 없어집니다.
          let arr_2 = [infowindow];

          function closeInfoWindow_2() {
            for (var i = 0; i < arr_2.length; i++) {
              arr_2[i].close();
            }
          }

          kakao.maps.event.addListener(marker_search, "click", function () {
            closeInfoWindow_2();
            // infowindow_search.open(map, marker_search); //인포윈도우 열기
          });
        });
      }

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "idle", function () {
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
          const infoDiv = document.getElementById("centerAddr");
        }
      }
    });
  }, [searchPlace]);

  if (searchAddress) {
    address = searchAddress;
    spot = searchSpot;
    latitude = searchLatitude;
    longitude = searchLongitude;
  }

  return (
    <Grid>
      {/* 검색 */}
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <Grid
        row
        margin="12px 0px"
        height="auto"
        padding="12px 24px 12px 0px"
        justify="space-between"
      >
        {" "}
        <Grid row margin="0px 0px 0px 24px">
          <FaMapMarkerAlt />
          <Text margin="0px 12px" size="16px">
            현재위치
          </Text>
        </Grid>
        {spot}
      </Grid>
      <div
        id="map"
        // center={state.center}
        style={{
          width: "100%",
          height: "600px",
          margin: "20px 0px",
        }}
      ></div>
      <Link
        to={{
          pathname: "/postwrite3",
          state: {
            maxMember,
            memberAge,
            memberGender,
            postCategory,
            postDesc,
            postTitle,
            address,
            latitude,
            longitude,
            spot,
          },
        }}
      >
        <FooterMenu next path="/postwrite3" text="확인" />
      </Link>
    </Grid>
  );
};

export default PostWrite_4;

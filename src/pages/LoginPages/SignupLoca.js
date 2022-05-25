import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import axios from "axios";
import { Grid, Text, Image, GoBack } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const SignupLoca = () => {
  const dispatch = useDispatch();

  //작성||수정 구분
  const edit = useSelector((state) => state.user?.userInfo.nickName);
  const is_edit = edit ? true : false;

  //유저정보
  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  //로컬 값 저장
  localStorage.setItem("address", address);

  //뒤로가기 시 로컬 값 삭제
  const remove = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    localStorage.removeItem("userInterest");
  };

  //현재 내 위치
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
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
          //현재 내 경도, 위도 => 주소로 변환
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: "KakaoAK 5498cafd5af35c66b35808e2b9e12971",
                },
              }
            )
            .then((res) => {
              const location = res.data.documents[0].address; //내 현 위치의 주소
              const result = `${location.region_1depth_name} ${location.region_2depth_name}`;

              setFullAddress(location.address_name);
              setAddress(result); //input에 지소 띄우기
            });
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <Grid column height="700px" bg="white">
      {is_edit ? (
        <GoBack text="동네 설정하기" path="/mypage" remove={remove} />
      ) : (
        <GoBack text="동네 설정하기" path="/signupdone" remove={remove} />
      )}

      {/* 동네 설정 */}
      <Grid height="auto" column margin="auto">
        <Grid row padding="0px 30px" height="auto" justify="space-between">
          <Image src="./img/nowloca.png" size={16} />
          <Text size="16px" margin="0px 80px 0px 0px" bold>
            나의 동네
          </Text>
          <Text size="16px">{fullAddress}</Text>
        </Grid>

        {/* 지도 */}
        <Map
          id="map"
          center={state.center}
          style={{
            width: "337px",
            height: "311px",
            margin: "0px 0px 300px 0px",
          }}
          level={3}
        >
          {/* 맵마커 */}
          {!state.isLoading && (
            <MapMarker
              position={state.center}
              image={{
                src: "./img/mypoint.png", // 마커이미지의 주소입니다
                size: {
                  width: 51,
                  height: 70,
                },
              }}
            ></MapMarker>
          )}
        </Map>

        {/* 푸터*/}
        {is_edit ? (
          <FooterMenu next text="다음" path="/editprofile" />
        ) : (
          <FooterMenu next text="다음" path="/addprofile" />
        )}
      </Grid>
    </Grid>
  );
};

export default SignupLoca;

const MsgBox = styled.div`
  padding: 5px;
`;

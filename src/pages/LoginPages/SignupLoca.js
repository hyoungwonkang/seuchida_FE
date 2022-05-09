import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Text, Image, GoBack } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const SignupLoca = () => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.user?.userInfo.userImg);

  const is_edit = edit ? true : false;

  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  const [address, setAddress] = useState();
  const [fullAddress, setFullAddress] = useState();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
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
              // console.log(res);
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
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <Grid column height="700px">
      {is_edit ? (
        <GoBack text="동네 설정하기" path="/mypage" />
      ) : (
        <GoBack text="동네 설정하기" path="/signupdone" />
      )}
      <Grid height="auto" column margin="auto">
        <Grid row padding="0px 30px" height="auto">
          <Image src="https://ifh.cc/g/NcBFMY.png" size={16} />
          <Text size="16px" margin="0px 60px 0px 0px">
            나의 동네
          </Text>
          <Text size="16px">{fullAddress}</Text>
        </Grid>

        <Map // 지도를 표시할 Container
          id="map"
          center={state.center}
          style={{
            width: "337px",
            height: "311px",
            margin: "0px 0px 300px 0px",
          }}
          level={3} // 지도의 확대 레벨
        >
          {!state.isLoading && (
            <MapMarker
              position={state.center}
              image={{
                src: "https://ifh.cc/g/NcBFMY.png", // 마커이미지의 주소입니다
                size: {
                  width: 40,
                  height: 40,
                },
              }}
            >
              <MsgBox>{state.errMsg ? state.errMsg : "내 위치"}</MsgBox>
            </MapMarker>
          )}
        </Map>

        <Link
          to={{
            pathname: "/addprofile",
            state: { address },
          }}
          style={{ textDecoration: "none" }}
        >
          <FooterMenu next path="/addprofile" text="다음" event="null" />
        </Link>
      </Grid>
    </Grid>
  );
};

const MsgBox = styled.div`
  padding: 5px;
`;

export default SignupLoca;

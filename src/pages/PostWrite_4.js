import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button } from '../elements/Index';
import styled from 'styled-components';
import FooterMenu from '../shared/FooterMenu';
import { KakaoMap } from '../components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';

// const { kakao } = window;

function PostWrite_4(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const get = props.location.state;
  console.log(get);
  const memberAge = get?.memberAge;
  const memberGender = get?.memberGender;
  const maxMember = get?.maxMember;
  const postCategory = get?.postCategory;
  const postTitle = get?.postTitle;
  const postDesc = get?.postDesc;
  const datemate = get?.datemate;
  const valueGroups = get?.valueGroups;

  const Main = () => {
    const [address, setAddress] = useState();
    const [position, setPosition] = useState();
    const [loca, setLoca] = useState({
      center: {
        lat: 33.450701,
        lng: 126.570667,
      },
      errMsg: null,
      isLoading: true,
    });

    React.useEffect(() => {
      //갱신으로 수정해야됨
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude; // 위도
            const lng = pos.coords.longitude; // 경도
            setLoca((prev) => ({
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
                    Authorization: 'KakaoAK 5498cafd5af35c66b35808e2b9e12971',
                  },
                }
              )
              .then((res) => {
                const location = res.data.documents[0].address; //내 현 위치의 주소
                const result = `${location.region_1depth_name} ${location.region_2depth_name}`;
                // console.log(res);
                setAddress(result); //input에 지소 띄우기
              });
          },
          (err) => {
            setLoca((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          }
        );
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        setLoca((prev) => ({
          ...prev,
          errMsg: 'geolocation을 사용할수 없어요..',
          isLoading: false,
        }));
      }
    }, []);

    let UserLoca = loca.center;
    console.log(address);

    const addPost = () => {
      const formData = new FormData();
      formData.append('postTitle', postTitle);
      formData.append('postDesc', postDesc);
      formData.append('postCategory', postCategory);
      formData.append('datemate', datemate);
      formData.append('maxMember', maxMember);
      formData.append('memberGender', memberGender);
      formData.append('memberAge', memberAge);
      formData.append('address', address);
      formData.append('position', position);
      console.log('formData', formData);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      return dispatch(postActions.addPostDB(formData));
    };

    return (
      <>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: UserLoca.lat,
            lng: UserLoca.lng,
          }}
          style={{
            width: '100%',
            height: '600px',
          }}
          level={3} // 지도의 확대 레벨
          onClick={(_t, mouseEvent) =>
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
        >
          {position && <MapMarker position={position} />}
        </Map>
        <Button _onClick={addPost}>다음</Button>
      </>
    );
  };

  return (
    <>
      <Main />
    </>
  );
}

export default PostWrite_4;

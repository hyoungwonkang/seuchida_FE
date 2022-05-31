import React from "react";
import styled, { keyframes } from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import { KakaoMap } from "../components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/index";

const Map = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = React.useState(false);
  const [post, setPost] = React.useState(null);
  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const researchMap = async () => {
    await axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/nearPostList`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response)
      setPost(response.data.nearPosts);
    });
  };

  React.useEffect(() => {
    researchMap();
  }, []);

  //비동기, 동기처리 마스터하자 ...
  const getPos = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const getCoordinate = async () => {
    if (navigator.geolocation) {
      const position = await getPos();
      return setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    } else {
      // Geolocation API에 액세스할 수 없으면 기본값 리턴
      return setState({
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
      });
    }
  };

  React.useEffect(() => {
    getCoordinate();
  }, []);

  let UserLoca = state.center;

  return (
    <>
      <div>
        <Header>
          <Title>
            내 주변에 개설된 <br />
            운동매칭이에요
          </Title>
        </Header>
        <div style={{ marginTop: "128px" }}>
          <ResearchBtn onClick={() => researchMap()}>재검색</ResearchBtn>
          <OpenModal onClick={() => setIsOpen(!isOpen)}>목록보기</OpenModal>
          {isOpen && (
            <Modal>
              {post?.map((p, i) => {
                return (
                  <Card
                    Map
                    {...p}
                    key={p.id}
                    center={state.center}
                    _onClick={() => {
                      history.push(`/postdetail/${p._id}`);
                    }}
                  />
                );
              })}
            </Modal>
          )}
          <KakaoMap
            MainMap
            UserLoca={UserLoca}
            post={post}
            _onClick={() => setIsOpen(false)}
          />
        </div>

        <FooterMenu />
      </div>
    </>
  );
};

export default Map;

const Header = styled.div`
  z-index: 3;
  background-color: white;
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  max-width: 390px;
  padding: 24px;
  position: fixed;
  top: 0;
`;

const Title = styled.div`
  color: #434343;
  font-size: 24px;
  font-weight: bold;
  margin-top: 12px;
  line-height: 36px;
`;
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;
const Modal = styled.div`
  width: 100%;
  height: 500px;
  position: fixed;
  z-index: 29;
  bottom: 80px;
  background: #fff;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  overflow: auto;
  overflow: x-hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const OpenModal = styled.div`
  position: fixed;
  bottom: 95px;
  z-index: 10;
  background-color: white;
  padding: 8px 16px;
  border-radius: 50px;
  margin-left: 40%;
  font-size: 14px;
  border: 2px solid #C4C4C4;
  cursor: pointer;

`;

const ResearchBtn = styled.div`
  position: fixed;
  z-index: 9999;
  background-color: white;
  padding: 8px 16px;
  border-radius: 50px;
  top: 175px;
  left: 41%;
  font-size: 14px;
  color: #c4c4c4;
  border: 1px solid #C4C4C4;
  cursor: pointer;
`;

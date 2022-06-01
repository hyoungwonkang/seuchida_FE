import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";

function Guide() {
  const history = useHistory();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
  };

  return (
    <div>
      <Sliders {...settings} styled={{ height: "auto" }}>
        <Img alt="guide1" src="/img/guide/guide1_big.png" />

        <Img alt="guide2" src="/img/guide/guide2_big.png" />

        <Img alt="guide3" src="/img/guide/guide3_big.png" />

        <Img alt="guide4" src="/img/guide/guide4_big.png" />

        <div>
          <ImgLast alt="guide5" src="/img/guide/guide5_big.png" />
          <LastBtn onClick={() => history.push("/")}>
            <span style={{ margin: "0px 20px 0px 0px" }}>
              로그인 하고 시작하기
            </span>
          </LastBtn>
        </div>
      </Sliders>
    </div>
  );
}

export default Guide;

const Img = styled.img`
  min-width: 390px;
  min-height: 800px;
  height: 100vh;
  width: 100%;
`;

const ImgLast = styled.img`
  min-width: 390px;
  min-height: 800px;
  width: 100%;
  height: calc(100vh-74px);
`;

const LastBtn = styled.button`
  min-width: 420px;
  height: 80px;
  position: fixed;
  bottom: 5px;
  color: white;
  border: none;
  background: #5796f7;
  font-size: 16px;
  cursor: pointer;
`;

const Sliders = styled(Slider)`
  .slider {
    position: relative;
  }
  .slick-dots {
    position: absolute;
    bottom: 110px;
  }
  .slick-dots li button:before {
    color: white;
  }
`;

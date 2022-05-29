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
    variableWidth: true,
  };

  return (
    <div>
      <Sliders {...settings} styled={{ height: "100px" }}>
        <div>
          <Img alt="guide1" src="/img/guide/guide1.png" />
        </div>
        <div>
          <Img alt="guide2" src="/img/guide/guide2.png" />
        </div>
        <div>
          <Img alt="guide3" src="/img/guide/guide3.png" />
        </div>
        <div>
          <Img alt="guide4" src="/img/guide/guide4.png" />
        </div>
        <div>
          <Img alt="guide5" src="/img/guide/guide5.png" />
          <LastBtn onClick={() => history.push("/")}>
            로그인 하여 시작하기
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
  width: 20vw;
`;

const LastBtn = styled.button`
  min-width: 390px;
  height: 70px;
  position: absolute;
  bottom: 5px;
  color: white;
  border: none;
  background: #5796f7;
  font-size: 16px;
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

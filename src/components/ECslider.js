import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EndCard from "./EndCard";
import styled from "styled-components";

// export default class ECslider extends Component {
function ECslider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <Sliders {...settings} style={{ height: "180px", margin: "0px" }}>
      <EndCard>
        <h3>1</h3>
      </EndCard>
      <EndCard>
        <h3>2</h3>
      </EndCard>
      <EndCard>
        <h3>3</h3>
      </EndCard>
    </Sliders>
  );
}

export default ECslider;

const Sliders = styled(Slider)`
  .slider {
    position: relative;
  }

  .slider .slick-list {
    margin: 0 -10px;
  }

  .slick-slide {
    margin: 0 10px;
  }
`;

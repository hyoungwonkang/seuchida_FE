import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EndCard from "./EndCard";
export default class ECslider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    };
    return (
      <Slider {...settings} style={{ height: "180px", margin: "0px" }}>
        <EndCard>
          <h3>1</h3>
        </EndCard>
        <EndCard>
          <h3>2</h3>
        </EndCard>
        <EndCard>
          <h3>3</h3>
        </EndCard>
      </Slider>
    );
  }
}

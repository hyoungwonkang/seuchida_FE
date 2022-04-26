import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LiveCard from "./LiveCard";

export default class LCslider extends Component {
  render() {
    const settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    };
    return (
      <div>
        <Slider {...settings} style={{height:"285px"}}>
          <LiveCard >
            <h3>1</h3>
          </LiveCard>
          <LiveCard>
            <h3>2</h3>
          </LiveCard>
          <LiveCard>
            <h3>3</h3>
          </LiveCard>
          <LiveCard>
            <h3>4</h3>
          </LiveCard>
          <LiveCard>
            <h3>5</h3>
          </LiveCard>
          <LiveCard>
            <h3>6</h3>
          </LiveCard>
          
        </Slider>
      </div>
    );
  }
}
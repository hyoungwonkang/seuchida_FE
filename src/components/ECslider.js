import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import EndCard from "./EndCard";
export default class ECslider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true
    };
    return (
 
        <Slider {...settings} style={{padding:"0px 15px", height:"185px"}}>
          <EndCard>
            <h3>1</h3>
          </EndCard>
          <EndCard>
            <h3>2</h3>
          </EndCard>
          <EndCard>
            <h3>3</h3>
          </EndCard>
          <EndCard>
            <h3>4</h3>
          </EndCard>
          <EndCard>
            <h3>5</h3>
          </EndCard>
          <EndCard>
            <h3>6</h3>
          </EndCard>
        </Slider>
    
    );
  }
}
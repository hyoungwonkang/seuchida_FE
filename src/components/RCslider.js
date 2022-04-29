import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./ReviewCard";

export default class RCslider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true
    };
    return (
 
        <Slider {...settings} style={{padding:"0px 15px", height:"240px"}}>
          <ReviewCard>
            <h3>1</h3>
          </ReviewCard>
          <ReviewCard>
            <h3>2</h3>
          </ReviewCard>
          <ReviewCard>
            <h3>3</h3>
          </ReviewCard>
          <ReviewCard>
            <h3>4</h3>
          </ReviewCard>
          <ReviewCard>
            <h3>5</h3>
          </ReviewCard>
          <ReviewCard>
            <h3>6</h3>
          </ReviewCard>
        </Slider>
     
    
    );
  }
}
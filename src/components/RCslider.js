import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./ReviewCard";

function RCslider(props) {
  const { review } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <Slider {...settings} style={{ padding: "0px 15px", height: "240px" }}>
      {review?.map((review, index) => {
        return (
          <ReviewCard
            review={review}
            key={review._id}
            _onClick={() => {
              window.location.href = `/reviewlist/${review._id}`;
            }}
          ></ReviewCard>
        );
      })}
    </Slider>
  );
}

export default RCslider;

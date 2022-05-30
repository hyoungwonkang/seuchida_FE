import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EndCard from "./EndCard";
import styled from "styled-components";

function ECslider(props) {
  const myEx = props?.myExercise;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
  };

  if (!myEx) return;

  return (
    <Sliders {...settings} style={{ height: "180px" }}>
      {myEx?.map((p, i) => {
        if (i < 5) {
          return <EndCard {...p} key={p?.id} _onClick={props._onClick} />;
        }
      })}
    </Sliders>
  );
}

export default ECslider;

const Sliders = styled(Slider)``;

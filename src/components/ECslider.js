import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EndCard from "./EndCard";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function ECslider(props) {
  const history = useHistory();
  const myEx = props?.myExercise;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  if (!myEx) return;

  return (
    <Sliders {...settings} style={{ height: "180px", padding: "0px 10px" }}>
      {myEx?.map((p, i) => {
        if (i < 5) {
          return (
            <EndCard
              {...p}
              key={p?.id}
              _onClick={() => {
                history.push(`/postdetail/${p._id}`);
              }}
            />
          );
        }
      })}
    </Sliders>
  );
}

export default ECslider;

const Sliders = styled(Slider)``;

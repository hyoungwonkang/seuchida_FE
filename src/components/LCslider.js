import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveCard from "./LiveCard";
import styled from "styled-components";

function LCslider(props) {
  const post = props.catepost;

  const settings = {
    className: "slider variable-width",
    // className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <div>
      <Slider {...settings} style={{ height: "270px" }}>
        {post?.map((p, i) => {
          if (i < 6)
            return (
              <LiveCard
                {...p}
                key={p.id}
                center={props.center}
                _onClick={props._onClick}
              />
            );
        })}

        {/* <LiveCard >
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
          </LiveCard> */}
      </Slider>
    </div>
  );
}

export default LCslider;

// const Sliders = styled(Slider)`
//   .slick-slide.slick-center {
//     transform: scale(1.1);
//   }
// `;

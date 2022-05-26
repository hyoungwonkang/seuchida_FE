import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveCard from "./LiveCard";
import styled from "styled-components";

function LCslider(props) {
  const post = props.catepost;

  const [state, setState] = useState("");

  React.useEffect(() => {
    if (post) {
      setState(post[0]?.postCategory);
    }
  }, []);

  //인덱스 값 변화에 따른 category 변화 조건
  post?.map((p, i) => {
    if (state === i) return setState(p?.postCategory);
  });

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: (current, next) => setState(next),
  };

  return (
    <div>
      <WellcomeBox>
        <Wellcome>
          {props.user}님
          <br />
          방금 개설된 가까운 <br />
          <Sports>{state}</Sports> 매칭이에요!
        </Wellcome>
        <img
          alt="point"
          src="../img/main.png"
          style={{
            margin: "0px 0px 0px 10px",
            width: "65px",
            height: "76px",
          }}
        />
      </WellcomeBox>
      <Sliders {...settings} style={{ height: "270px" }}>
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
      </Sliders>
    </div>
  );
}

export default LCslider;

const Sliders = styled(Slider)`
  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const WellcomeBox = styled.div`
  font-size: 24px;
  padding: 40px 24px 30px 24px;
  background-color: #0ed88b;
  display: flex;
  flex-direction: row;
`;

const Sports = styled.div`
  display: inline;
  color: #ffffff;
  font-weight: bold;
`;

const Wellcome = styled.div`
  color: #ffffff;
`;

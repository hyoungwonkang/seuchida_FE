import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveCard from "./LiveCard";
import styled from "styled-components";

function LCslider(props) {
  const {mainalert, catepost} = props
  // const post = props.catepost;
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  window.addEventListener('wheel', (e) => { 
    setIsOpen(false)
  });
  React.useEffect(() => {
    if (catepost) {
      setState(catepost[0]?.postCategory);
    }
  }, [catepost]);

  //인덱스 값 변화에 따른 category 변화 조건
  catepost?.map((p, i) => {
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
        <div>
          <img
            onClick={() => {
              setIsOpen(true);
            }}
            alt="point"
            src="../img/mainseuchin.png"
            style={{
              margin: "5px 0px 0px 0px",
              // padding: "30px 0px 0px 30px",
              // position: "fixed",
              width: "90px",
              height: "95px",
            }}
          />
        </div>
      </WellcomeBox>
      {isOpen && (
     
          <ArlamBox> 
            {mainalert?.map((a, index) =>{
              return (  <div> {a.nickName}</div>)
            })}

          </ArlamBox>
    
      )}
      <Sliders {...settings} style={{ height: "270px" }}>
        {catepost?.map((p, i) => {
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
  width: 390px;
  font-size: 24px;
  padding: 40px 24px 30px 24px;
  background-color: #0ed88b;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Sports = styled.div`
  display: inline;
  color: #ffffff;
  font-weight: bold;
`;

const Wellcome = styled.div`
  color: #ffffff;
`;

const ArlamBox = styled.div`
  width: 240px;
  height: auto;
  background-color: gray;
  position: fixed;
  z-index: 99;
  top:165px;
  right: 0;
  ::before{
  content: '';
  position: absolute;
  top: 0;
  left: 65%;
  width: 0;
  height: 0;
  border: 25px solid transparent;
  border-bottom-color: gray;
  border-top: 0;
  border-right: 0;
  margin-left: -12.5px;
  margin-top: -25px;
  z-index: 99}
`;




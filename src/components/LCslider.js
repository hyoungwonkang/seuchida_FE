import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveCard from "./LiveCard";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Image from "../elements/Image";
import { history } from "../redux/configStore";
import { actionCreators as roomActions } from "../redux/modules/room";
import { Grid, Text } from "../elements/Index";

function LCslider(props) {
  const { catepost } = props;
  const joinARR = useSelector((state) => state?.room?.joinArr);
  const mainalarm = useSelector(state=> state.room.mainarr)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");


  window.addEventListener("wheel", (e) => {
    setIsOpen(false);
  });

  const ArlamCheck =() =>{
    dispatch(roomActions.mainArlam(false))
    setIsOpen(!isOpen);
  }

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
          {props?.user}님
          <br />
          방금 개설된 가까운 <br />
          <Sports>{state}</Sports> 매칭이에요!
        </Wellcome>

         {mainalarm&& <Hey>!!</Hey>}
        <div>
          <img
            onClick={ArlamCheck}
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
          {joinARR[0]? 
          joinARR?.map((a, index) => {
            if(index<6)return (
              <React.Fragment key={index}>
                <ArrsmallBox onClick={()=>{
                  history.push(`/postdetail/${a?.postId}`)
                }}>
               
                  <div> {<Image src={a?.userImg} size="30" />}</div>
                  <Joinwho>
                    {a?.nickName}님이 {a?.postTitle} 방에 참여 하셨어요!
                  </Joinwho>
                  
                </ArrsmallBox>
              </React.Fragment>
            )
          }) :<ArrsmallBox></ArrsmallBox>}
        </ArlamBox>
      )}
      {catepost.length === 0 ? (
        <Grid padding="0px 0px 40px 0px" column>
          <img src="./img/seuchin.png" style={{ margin: "40px 0px 0px 0px" }} />
          <Text bold margin="0px" color="#C4C4C4">
            카테고리에 해당하는 글이 없어요!
          </Text>
        </Grid>
      ) : (
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
      )}
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
  background-color: #fff;
  position: fixed;
  z-index: 99;
  top: 165px;
  right: 15px;
 
  border-radius: 6px;
  box-shadow:  1px 2px 4px -2px;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 73%;
    width: 0;
    height: 0;
    border: 25px solid transparent;
    border-bottom-color: #fff;
    border-top: 0;
    border-right: 0;
    margin-left: -12.5px;
    margin-top: -25px;
    z-index: 99;
  }
`;

const Joinwho = styled.div`
font-size: 11px;
align-items: center;
display: flex;
margin-left: 5px;
`

const ArrsmallBox = styled.div`
display: flex;
flex-direction: row;
margin-top: 5px;
border-bottom: 1px solid #DDDDDD;
padding: 8px;

`

const Hey = styled.span`
z-index: 555;
color: #FF6A52;
height: 20px;
bottom: 10px;
float: right;
position: relative;
right: -80px;
font-size: 24px;
font-weight: bolder;
`
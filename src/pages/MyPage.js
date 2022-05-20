import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FooterMenu from "../shared/FooterMenu";
import { ECslider } from "../components";
import { Grid, Image, Text } from "../elements/Index";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configStore";
import { RiBarChartFill } from "react-icons/ri";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
const NameCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.isLoginDB());
    dispatch(mypageActions.myExerciseDB());
    dispatch(mypageActions.myReviewDB());
  }, []);
  const userInfo = useSelector((state) => state.user.userInfo);
  // console.log(userInfo);
  const myReview = useSelector((state) => state.mypage.myReview);
  const len = myReview.length;
  return (
    <Grid column height="auto" margin="0px" bg="white">
      {/* 프로필 수정, 알람 */}
      <Grid row height="auto" margin="20px 0px 0px 0px" justify="right">
        <BsFillBellFill size={24} style={{ marginRight: 8 }} />
        <AiFillSetting
          size={24}
          style={{ marginRight: 15 }}
          onClick={() => history.push("/signuploca")}
        />
      </Grid>
      {/* 프로필이미지 */}
      <Image
        shape="circle"
        size={60}
        src={userInfo.userImg}
        margin="19px 0px 8px 0px"
      />
      {/* 유저 닉네임 */}
      <Grid row justify="center">
        {len >= 60 ? (
          <Image src="./img/purple.png" />
        ) : len >= 50 ? (
          <Image src="./img/blue.png" />
        ) : len >= 40 ? (
          <Image src="./img/skyblue.png" />
        ) : len >= 30 ? (
          <Image src="./img/green.png" />
        ) : len >= 20 ? (
          <Image src="./img/yellow.png" />
        ) : len >= 10 ? (
          <Image src="./img/orange.png" />
        ) : len >= 0 ? (
          <Image src="./img/red.png" />
        ) : (
          ""
        )}
        <Text size="24px" margin="0px" color="#323232" bold>
          {userInfo.nickName}
        </Text>
      </Grid>
      {/* 유저 관심사 */}
      <Grid row height="auto" margin="8px 0px 16px 0px" justify="center">
        {userInfo.userInterest?.map((v, i) => {
          return <Cate key={v + i}>{v}</Cate>;
        })}
      </Grid>
      {/* 유저 소개글 */}
      <Text width="302px" color="#505050" margin="0px 0px 45px 0px">
        {userInfo.userContent}
      </Text>
      <button
        onClick={() => {
          dispatch(mypageActions.signDownDB());
          history.replace("/");
        }}
      >
        회원탈퇴
      </button>
    </Grid>
  );
};

const MyPage = () => {
  const myReview = useSelector((state) => state.mypage.myReview);
  const myExercise = useSelector((state) => state.mypage.myExercise);
  const len = JSON.stringify(myReview.length);

  if (
    len?.length === 10 ||
    len?.length === 20 ||
    len?.length === 30 ||
    len?.length === 40 ||
    len?.length === 50 ||
    len?.length === 60
  ) {
    window.alert("레벨업 했습니다!");
  }

  return (
    <>
      <Grid bg="#0ED88B" height="auto" margin="0px 0px 70px 0px">
        <NameCard />
        <Grid height="117px" column justify="center" padding="30px 0px 0px 0px">
          <ProgressBar>
            <Highlight width={(len.charAt(len.length - 1) / 10) * 100 + "%"} />
            <Seuchin src="./img/seuchin.png" />
          </ProgressBar>
          <Text size="16px" width="342px" color="#FFFFFF" bold margin="5px">
            {len >= 50
              ? "Purple"
              : len >= 40
              ? "Blue"
              : len >= 30
              ? "Skyblue"
              : len >= 20
              ? "Green"
              : len >= 10
              ? "Yellow"
              : "Orange"}
            레벨까지
            {10 - len.charAt(len.length - 1)}
            포인트
          </Text>
        </Grid>
        <Grid
          padding="10px 24px"
          margin="0px 10px 0px 0px"
          bg="white"
          height="300px"
        >
          <Text size="16px" bold>
            <RiBarChartFill color="#FF6B52" />
            운동 후기 남기고 스친 레벨 올리자!
          </Text>
          <ECslider myExercise={myExercise} />
        </Grid>
        <Grid row bg="white" height="62px" margin="0px" border="1px solid #ddd">
          <Text size="16px" margin="0px 0px 0px 24px" bold>
            내가 만든 모임
          </Text>
          <IoIosArrowForward
            size={30}
            style={{ margin: "0px 0px 0px 220px" }}
            onClick={() => {
              history.push("/mypost");
            }}
          />
        </Grid>
        <Grid row bg="white" height="62px" margin="0px" border="1px solid #ddd">
          <Text size="16px" margin="0px 0px 0px 24px" bold>
            내가 쓴 후기
          </Text>
          <IoIosArrowForward
            size={30}
            style={{ margin: "0px 0px 0px 233px" }}
            onClick={() => {
              history.push("/myreview");
            }}
          />
        </Grid>
      </Grid>
      <FooterMenu />
    </>
  );
};

export default MyPage;
const ProgressBar = styled.div`
  background: #ffffff;
  width: 342px;
  height: 12px;
  display: flex;
  border-radius: 12px;
`;
const Seuchin = styled.img`
  width: 79px;
  height: 93px;
  margin: -95px 0px 0px -50px;
  /* position: absolute;
  top: 265px;
  left: 50px; */
`;
const Highlight = styled.div`
  background: #ffe926;
  transition: 1s width; //몇초동안 뭐를(생략하면 모든것을 바꿈)
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 12px;
`;
//카테고리 한 개 css
const Cate = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  margin: 5px 3px;
  padding: 8px 13px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  background: ${(props) => (props.click ? "#0ED88B" : "white")};
  color: ${(props) => (props.click ? "white" : "black")};
`;

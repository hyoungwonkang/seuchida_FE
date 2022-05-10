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
    // dispatch(mypageActions.myExerciseDB());
    dispatch(mypageActions.myReviewDB());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);
  const myReview = useSelector((state) => state.mypage.myReview);
  const len = myReview.length;

  //유저 등급
  const medal = [
    { count: 0, md: "" },
    { count: 10, md: "🏅" },
    { count: 20, md: "🥉" },
    { count: 30, md: "🥈" },
    { count: 40, md: "🥇" },
    { count: 50, md: "🏆" },
  ];

  return (
    <Grid column height="auto" brbottom margin="0px" bg="white">
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
      <Text size="24px" margin="0px" color="#323232">
        {/* {medal.map((v, i) => {
          len === 13 ? v.md : "";
        })} */}

        {len >= 50
          ? "🏆"
          : len >= 40
          ? "🥇"
          : len >= 30
          ? "🥈"
          : len >= 20
          ? "🥉"
          : len >= 10
          ? "🏅"
          : ""}

        {userInfo.nickName}
      </Text>

      {/* 유저 관심사 */}
      <Grid row height="auto" margin="8px 0px 16px 0px" justify="center">
        {userInfo.userInterest?.map((v, i) => {
          return (
            <Text br margin="0px 5px" key={v + i} color="#000000">
              {v}
            </Text>
          );
        })}
      </Grid>

      {/* 유저 소개글 */}
      <Text width="302px" color="#505050" margin="0px 0px 45px 0px">
        {userInfo.userContent}
      </Text>
    </Grid>
  );
};

const MyPage = () => {
  const myReview = useSelector((state) => state.mypage.myReview);
  const len = myReview.length;

  const Grade = [
    { key: 0, grade: "Iron" },
    { key: 10, grade: "Bronze" },
    { key: 20, grade: "Silver" },
    { key: 30, grade: "Gold" },
    { key: 40, grade: "Platinum" },
    { key: 50, grade: "Diamond" },
  ];

  const levelUp = [10, 20, 30, 40, 50];

  if (
    len?.length === 10 ||
    len?.length === 20 ||
    len?.length === 30 ||
    len?.length === 40
  ) {
    window.alert("레벨업 했습니다!");
  }

  return (
    <>
      <Grid bg="#0ED88B" height="950px">
        <Grid height="auto">
          <NameCard />
          <Grid height="96px" column margin="auto">
            <Text
              size="16px"
              margin="30px 0px 0px 0px"
              width="342px"
              color="#FFFFFF"
            >
              {/* {Grade.map((v, i) => {
                return myReviewcnt.length >= v.key &&
                  myReviewcnt.length <= v.key + 1
                  ? v.grade
                  : "";
              })} */}
              {len >= 40
                ? Grade[5].grade
                : len >= 30
                ? Grade[4].grade
                : len >= 20
                ? Grade[3].grade
                : len >= 10
                ? Grade[2].grade
                : Grade[1].grade}
              레벨까지
              {10 -
                (len >= 40
                  ? len - 40
                  : len >= 30
                  ? len - 30
                  : len >= 20
                  ? len - 20
                  : len >= 10
                  ? len - 10
                  : len)}
              회
            </Text>

            <Grid
              bg="#FFFFFF"
              height="12px"
              width="342px"
              margin="0px 0px 30px 0px"
              br="12px"
            >
              <Highlight
                width={
                  len >= 40
                    ? ((len - 40) / 10) * 100 + "%"
                    : len >= 30
                    ? ((len - 30) / 10) * 100 + "%"
                    : len >= 20
                    ? ((len - 20) / 10) * 100 + "%"
                    : len >= 10
                    ? ((len - 10) / 10) * 100 + "%"
                    : (len / 10) * 100 + "%"
                }
              />
              <Text
                size="16px"
                margin="0px 0px 0px 310px"
                width="342px"
                color="#FFFFFF"
              >
                {len >= 40
                  ? len - 40
                  : len >= 30
                  ? len - 30
                  : len >= 20
                  ? len - 20
                  : len >= 10
                  ? len - 10
                  : len}
                /10
              </Text>
            </Grid>
          </Grid>

          <Grid padding="10px 24px" margin="0px 10px 0px 0px">
            <Text size="16px" color="#FFFFFF">
              <RiBarChartFill color="#FFFFFF" /> {""}
              운동 후기 남기고 스친 레벨 올리자!
            </Text>
            {/* 내가 참여한 운동 => 추후 BE와 연결시 변동 예정*/}
            <ECslider />
          </Grid>
        </Grid>

        <Grid column bg="white" height="auto" margin="30px 0px 0px 0px">
          <Grid height="200px" bg="white">
            <Grid
              row
              bg="white"
              height="62px"
              margin="0px"
              border="1px solid #ddd"
            >
              <Text size="16px" margin="0px 0px 0px 24px">
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
            <Grid
              row
              bg="white"
              height="62px"
              margin="0px"
              border="1px solid #ddd"
            >
              <Text size="16px" margin="0px 0px 0px 24px">
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
        </Grid>
      </Grid>

      <FooterMenu />
    </>
  );
};

export default MyPage;

const Highlight = styled.div`
  background: #ffe926;
  transition: 1s width; //몇초동안 뭐를(생략하면 모든것을 바꿈)
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 12px;
`;

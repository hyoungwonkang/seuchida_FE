import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FooterMenu from "../shared/FooterMenu";
import { ECslider } from "../components";
import { Grid, Image, Text, Button } from "../elements/Index";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configStore";
import { RiBarChartFill } from "react-icons/ri";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";

const NameCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.isLoginDB());
    dispatch(mypageActions.myExerciseDB());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);

  const level = [
    { id: 1, level: 1, image: <Image src="./img/red.png" /> },
    { id: 2, level: 2, image: <Image src="./img/orange.png" /> },
    { id: 3, level: 3, image: <Image src="./img/yellow.png" /> },
    { id: 4, level: 4, image: <Image src="./img/green.png" /> },
    { id: 5, level: 5, image: <Image src="./img/skyblue.png" /> },
    { id: 6, level: 6, image: <Image src="./img/blue.png" /> },
    { id: 7, level: 7, image: <Image src="./img/purple.png" /> },
  ];

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

      {/* 유저 레벨 & 닉네임 */}
      <Grid row justify="center">
        {level.map((v, i) => {
          if (v.level == userInfo.level) return v.image;
        })}
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
    </Grid>
  );
};

const MyPage = () => {
  const dispatch = useDispatch();
  const myExercise = useSelector((state) => state.mypage.myExercise);
  const a = useSelector((state) => state);
  console.log(a);
  const userInfo = useSelector((state) => state.user.userInfo);
  const point = JSON.stringify(userInfo?.userEvalue);

  const [isOpen, setIsOpen] = React.useState(false);

  const singdown = () => {
    dispatch(mypageActions.signDownDB());
    history.push("/");
  };

  const level = [
    { id: 0, level: 0, color: "red" },
    { id: 1, level: 1, color: "orange" },
    { id: 2, level: 2, color: "yellow" },
    { id: 3, level: 3, color: "green" },
    { id: 4, level: 4, color: "skyblue" },
    { id: 5, level: 5, color: "blue" },
    { id: 6, level: 6, color: "purple" },
  ];

  return (
    <Grid height="auto">
      <NameCard />

      {/* 프로그래스바 */}
      <Grid
        height="117px"
        column
        justify="center"
        padding="30px 0px 0px 0px"
        bg="#0ED88B"
      >
        <ProgressBar>
          <Highlight
            width={(point?.charAt(point.length - 1) / 10) * 100 + "%"}
          />
          <Seuchin src="./img/seuchin.png" />
        </ProgressBar>
        <Text size="16px" width="342px" color="#FFFFFF" bold margin="5px">
          {level.map((v, i) => {
            if (v.level == userInfo.level) return v.color;
          })}
          레벨까지
          {10 - point?.charAt(point.length - 1)}
          포인트
        </Text>
      </Grid>

      {/* 후기 남기기 */}
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
        {myExercise.length != 0 ? (
          <ECslider myExercise={myExercise} />
        ) : (
          <Grid
            border="1px solid #ddd"
            width="342px"
            height="168px"
            br="12px"
            padding="0px 10px"
            bg="white"
            column
          >
            <Text margin="70px" bold size="16px" position>
              후기를 다 작성하셨네요!
            </Text>
            <img
              src="./img/review.png"
              alt="review"
              style={{
                margin: "50px auto",
              }}
            />
          </Grid>
        )}
      </Grid>

      {/* 내가 만든 목록 */}
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

      <Grid padding="50px 0px 100px 0px" column>
        <Button
          wd="342px"
          bg="#fff"
          br="1px solid #C4C4C4"
          color=" #C4C4C4"
          _onClick={() => {
            setIsOpen(true);
          }}
        >
          탈퇴하기
        </Button>
      </Grid>

      {/* 회원 탈퇴 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData
          Check
          yes={() => singdown()}
          onClose={() => setIsOpen(false)}
          text="정말로 탈퇴하시겠습니까?"
        />
      </Modal>

      <FooterMenu />
    </Grid>
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
  margin: -95px 0px 0px -30px;
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

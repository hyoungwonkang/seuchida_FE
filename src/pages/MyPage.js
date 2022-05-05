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

const NameCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Grid column height="304px" brbottom margin="0px" bg="white">
      <Grid row height="auto" margin="20px 0px 0px 0px" justify="right">
        <BsFillBellFill size={24} style={{ marginRight: 8 }} />
        <AiFillSetting
          size={24}
          style={{ marginRight: 15 }}
          onClick={() => history.push("/signuploca")}
        />
      </Grid>

      <Image
        shape="circle"
        size={60}
        src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
        margin="19px 0px 8px 0px"
      />
      <Text size="24px" margin="0px">
        🥇{userInfo.nickName}
      </Text>

      <Grid row height="auto" margin="8px 0px 16px 0px" justify="center">
        {userInfo.userInterest?.map((v, i) => {
          return (
            <Text br margin="0px 5px" key={v + i}>
              {v}
            </Text>
          );
        })}
      </Grid>

      <Text width="302px" color="gray" margin="0px 0px 45px 0px">
        {userInfo.userContent}
      </Text>
    </Grid>
  );
};

const MyPage = () => {
  return (
    <>
      <Grid bg="#F6F6F6" height="950px">
        <Grid height="auto">
          <NameCard />
          <Grid height="96px" column margin="auto">
            <Text
              size="16px"
              margin="30px 0px 0px 0px"
              width="342px"
              color="gray"
            >
              Green 레벨까지 6회
            </Text>

            <Grid
              bg="#ddd"
              height="12px"
              width="342px"
              margin="0px 0px 30px 0px"
              br="12px"
            >
              <Highlight width={"130px"} />
              <Text
                size="16px"
                margin="0px 0px 0px 310px"
                width="342px"
                color="gray"
              >
                4/10
              </Text>
            </Grid>
          </Grid>

          <Grid padding="10px 24px" margin="0px 10px 0px 0px">
            <Text size="16px">
              <RiBarChartFill /> {""}
              운동 후기 남기고 스친 레벨 올리자!
            </Text>
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
                  history.push();
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
                  history.push();
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
  background: black;
  transition: 1s width; //몇초동안 뭐를(생략하면 모든것을 바꿈)
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 12px;
`;

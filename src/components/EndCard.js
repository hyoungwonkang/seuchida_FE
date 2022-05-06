import React, { useEffect } from "react";
import { Grid, Image, Text } from "../elements/Index";
import { history } from "../redux/configStore";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const EndCard = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userActions.isLoginDB());
  // }, []);

  // const userInfo = useSelector((state) => state);
  // console.log(userInfo);

  return (
    <>
      <Grid
        border="1px solid #ddd"
        width="342px"
        height="168px"
        br="12px"
        padding="0px 10px"
        bg="white"
      >
        <Text size="16px">* 모집완료 배드민턴 칠 사람!</Text>

        <Text size="16px">
          근린공원에서 같이 배드민턴 쳐요~ 초보자분들도 열정있게 치시면
          참여가능!
        </Text>
        <Grid row height="auto" padding="5px">
          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={32}
            margin="3px"
          />
          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={32}
            margin="3px"
          />
          <Text
            size="12px"
            margin="0px 0px 0px 150px"
            _onClick={() => history.push("/reviewwrite")}
          >
            <FaPen size={14} onClick={() => history.push("/reviewwrite")} />
            후기 작성하기
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

export default EndCard;

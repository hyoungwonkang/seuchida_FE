import React, { useEffect } from "react";
import { Grid, Image, Text } from "../elements/Index";
import { history } from "../redux/configStore";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const EndCard = (props) => {
  if (!props) return;

  return (
    <Grid
      border="1px solid #ddd"
      width="342px"
      height="168px"
      br="12px"
      padding="10px 20px"
      bg="white"
    >
      <Grid row height="auto">
        <Text size="16px" bold color="#FF6B52" margin="0px 10px 0px 0px">
          · {props?.status === true ? "모집중" : "모집완료"}
        </Text>
        <Text size="16px" bold>
          {props?.postTitle}
        </Text>
      </Grid>

      <Text size="16px" margin="0px 0px 25px 0px">
        {props?.postDesc}
      </Text>

      <Grid row height="auto" justify="space-between">
        <Grid row>
          {props.nowMember?.map((v, i) => {
            return (
              <div key={v + i}>
                <Image
                  shape="circle"
                  src={v.memberImg}
                  size={32}
                  margin="0px 0px 0px 3px"
                />
              </div>
            );
          })}
        </Grid>

        <Grid row padding="0px 0px 0px 80px">
          <FaPen
            color="#C4C4C4"
            size={14}
            onClick={() => history.push(`/reviewwrite/${props.postId}`)}
          />
          <Text
            size="12px"
            // margin="0px 0px 0px 150px"
            _onClick={() => history.push(`/reviewwrite/${props.postId}`)}
            post={props.PostId}
          >
            후기 작성하기
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EndCard;

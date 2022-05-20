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
      padding="0px 10px"
      bg="white"
    >
      <Text size="16px">* 모집완료 {props?.postTitle}</Text>

      <Text size="16px">{props?.postDesc}</Text>
      <Grid row height="auto" padding="5px">
        {props.nowMember?.map((v, i) => {
          return (
            <div key={v + i}>
              <Image shape="circle" src={v.memberImg} size={32} margin="3px" />
            </div>
          );
        })}

        <Text
          size="12px"
          margin="0px 0px 0px 150px"
          _onClick={() => history.push(`/reviewwrite/${props.postId}`)}
          post={props.PostId}
        >
          <FaPen
            size={14}
            onClick={() => history.push(`/reviewwrite/${props.postId}`)}
          />
          후기 작성하기
        </Text>
      </Grid>
    </Grid>
  );
};

export default EndCard;

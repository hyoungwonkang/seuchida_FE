import React from "react";
import { Grid, Image, Text } from "../elements/Index";
import { history } from "../redux/configStore";
import { FaPen } from "react-icons/fa";
import styled from "styled-components";

const EndCard = (props) => {
  if (!props) return;

  return (
    <Grid
      border="1px solid #ddd"
      width="100%"
      height="168px"
      br="12px"
      padding="8px 20px"
      bg="white"
      _onClick={props._onClick}
    >
      <Grid row height="auto">
        <Text size="16px" bold color="#FF6B52" margin="0px 10px 0px 0px">
          · {props?.status === true ? "모집중" : "모집완료"}
        </Text>
        <Text size="16px" bold el>
          {props?.postTitle}
        </Text>
      </Grid>

      <Desc>{props?.postDesc}</Desc>

      <Grid
        row
        height="auto"
        justify="space-between"
        padding="15px 0px 0px 0px"
      >
        <Grid row>
          {props.nowMember?.map((v, i) => {
            if (i < 3) {
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
            }
          })}
          {props.nowMember.length > 3 ? (
            <div>+{props.nowMember.length - 3}</div>
          ) : null}
        </Grid>

        {props?.status === true ? (
          ""
        ) : (
          <Grid row padding="0px 0px 0px 80px" cursor>
            <FaPen
              color="#C4C4C4"
              size={14}
              onClick={() => history.push(`/reviewwrite/${props.postId}`)}
            />
            <Text
              size="12px"
              _onClick={() => history.push(`/reviewwrite/${props.postId}`)}
              post={props.PostId}
            >
              후기 작성하기
            </Text>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default EndCard;
const Desc = styled.div`
  font-size: 16px;
  height: 60px;
  padding: 0px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.3em;
  height: 2.4em;
  color: #585858;
`;

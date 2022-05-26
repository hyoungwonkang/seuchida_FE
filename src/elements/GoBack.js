import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Grid, Text } from "./Index";

const GoBack = (props) => {
  const { postBack, postBackCategory } = props;

  const history = useHistory();
  if (props.gback) {
    return (
      <>
        <IoIosArrowBack size={32} onClick={props._onClick} />
      </>
    );
  }

  //게시글 작성에서 쓰이는 것 입니다.
  if (postBack) {
    return (
      <>
        <Grid row padding="20px">
          <IoIosArrowBack
            size={32}
            onClick={() => {
              history.push(props.path);
            }}
          />
          <Text size="20px" position margin="0px 0px 0px 40px" bold>
            {props.text}
          </Text>
        </Grid>
      </>
    );
  }

  if (postBackCategory) {
    return (
      <>
        <Grid row padding="20px">
          <IoIosArrowBack
            size={32}
            onClick={() => {
              localStorage.removeItem("address");
              localStorage.removeItem("spot");
              localStorage.removeItem("latitude");
              localStorage.removeItem("longitude");
              localStorage.removeItem("datemate");
              localStorage.removeItem("memberAge");
              localStorage.removeItem("memberGender");
              localStorage.removeItem("maxMember");
              localStorage.removeItem("postCategory");
              localStorage.removeItem("postTitle");
              localStorage.removeItem("postDesc");
              localStorage.removeItem("showOptions");
              localStorage.removeItem("showDate");
              localStorage.removeItem("showTime");
              history.push(props.path);
            }}
          />
          <Text size="20px" position margin="0px 0px 0px 40px" bold>
            {props.text}
          </Text>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid row padding="20px">
        <IoIosArrowBack
          size={32}
          onClick={() => {
            history.push(props.path);
            if (props.remove) {
              props.remove();
            }
          }}
        />
        <Text size="20px" margin="0px 0px 0px 16px" bold>
          {props.text}
        </Text>
      </Grid>
    </>
  );
};

export default GoBack;

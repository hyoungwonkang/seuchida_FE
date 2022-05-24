import React from "react";
import { IoIosArrowBack } from "react-icons/io";
// import { history } from "../redux/configStore";
import { useHistory } from "react-router-dom";
import { Grid, Text } from "./Index";

const GoBack = (props) => {
  const { postBack } = props;

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

  return (
    <>
      <Grid row padding="20px">
        <IoIosArrowBack
          size={32}
          onClick={() => {
            // history.push(props.path);
            history.goBack();
          }}
        />
        <Text size="20px" position margin="0px 0px 0px 40px" bold>
          {props.text}
        </Text>
      </Grid>
    </>
  );
};

export default GoBack;

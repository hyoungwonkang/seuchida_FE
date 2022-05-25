import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Grid, Text } from "./Index";

const GoBack = (props) => {
  const history = useHistory();
  if (props.gback) {
    return (
      <>
        <IoIosArrowBack size={32} onClick={props._onClick} />
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
        <Text size="20px" position margin="0px 0px 0px 40px" bold>
          {props.text}
        </Text>
      </Grid>
    </>
  );
};

export default GoBack;

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { history } from "../redux/configStore";
import { Grid, Text } from "../elements/Index";

const GoBack = (props) => {
  return (
    <Grid row padding="20px">
      <IoIosArrowBack
        size={32}
        onClick={() => {
          history.push(props.path);
        }}
      />
      <Text size="20px" position margin="0px 0px 0px 40px">
        {props.text}
      </Text>
    </Grid>
  );
};

export default GoBack;

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { history } from "../redux/configStore";
import { Grid, Text } from "../elements/Index";

const GoBack = (props) => {
  return (
    <Grid row padding="20px 40px">
      <IoIosArrowBack
        size={32}
        onClick={() => {
          history.goBack();
        }}
      />
      <Text size="20px" position margin="0px 0px 0px 50px">
        {props.text}
      </Text>
    </Grid>
  );
};

export default GoBack;
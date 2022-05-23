import React from "react";
import { Grid, Button, Text } from "../elements/Index";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <Grid column>
      <Grid column width="200px" padding="200px 0px 0px 0px">
        <img src="./img/seuchin.png" />
      </Grid>
      <Text margin="50px 0px 0px 0px" size="20px" bold>
        잘못된 주소입니다:(
      </Text>
      <Button
        bg="#00D282"
        width="100px"
        margin="100px 0px 0px 0px"
        _onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </Button>
    </Grid>
  );
};

export default NotFound;

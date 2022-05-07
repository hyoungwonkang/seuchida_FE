import React from "react";
import { Grid, Image, Text } from "../elements/Index";

const ReviewCardD = (props) => {
  return (
    <Grid height="auto" border_bottom="1px solid #ddd">
      <Grid row height="56px" width="342px" margin="auto">
        <Image size={36} src={props.userImg}></Image>
        <Grid height="40px" width="auto">
          <Text margin="0px">{props.nickName}</Text>
          <Text margin="0px" color="gray">
            2022.05.02
          </Text>
        </Grid>
      </Grid>

      <Image shape="rectangle" src={props.reviewImg} />

      <Grid width="342px" margin="auto" height="auto">
        <Text>{props.content}</Text>
        <Grid height="68px">
          <Text margin="0px">{props.spot} </Text>
          <Text margin="0px">{props.postCategory}</Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewCardD;

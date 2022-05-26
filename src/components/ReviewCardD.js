import React from "react";
import { Grid, Image, Text } from "../elements/Index";
import { BiDumbbell } from "react-icons/bi";
import { MdPlace } from "react-icons/md";

const ReviewCardD = (props) => {
  return (
    <Grid height="auto" border_bottom="1px solid #ddd">
      <Grid row height="56px" width="342px" margin="auto" padding="30px 0px">
        <Image size={36} src={props.userImg}></Image>
        <Grid height="40px" width="auto">
          <Text margin="0px 0px 0px 10px">
            {props.nickName === "undefined" ? "탈퇴한 회원" : props.nickName}
          </Text>
          <Text margin="0px 0px 0px 10px" color="gray">
            {props.createdAt}
          </Text>
        </Grid>
      </Grid>

      {props.reviewImg ? (
        <Image shape="rectangle" src={props.reviewImg} />
      ) : null}

      <Grid width="342px" margin="auto" height="auto" padding="10px 0px">
        <Text>{props.content}</Text>
        <Grid height="68px" padding="15px 0px ">
          <Text margin="0px">
            <MdPlace color="#787878" /> {props.spot}
          </Text>
          <Text margin="0px">
            <BiDumbbell color="#787878" /> {props.postCategory}
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewCardD;

import React from "react";
import { Button, Text, Grid, Image } from "../../elements/Index";

const ModalData = (props) => {
  const { Members, Alert, Alert2, Alert3, Check, text, onClose, onCheck } =
    props;

  //재확인 창
  if (Check) {
    return (
      <Grid width="240px" height="156px">
        <Text>{text}</Text>
        <button onClick={onClose}>취소</button>
        <button onClick={onCheck}>삭제</button>
      </Grid>
    );
  }

  //alert 창
  if (Alert) {
    return (
      <Grid width="240px" height="156px" column padding="17px">
        <Grid column height="44px">
          <Text margin="20px 0px 0px 0px">앗!</Text>
          <Text margin="0px">{text}</Text>
        </Grid>
        <hr
          style={{
            width: "240px",
            borderTop: "1px solid gray",
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            margin: "30px 0px 0px 0px",
          }}
        />
        <Button is_close _onClick={onClose}>
          확인
        </Button>
      </Grid>
    );
  }

  if (Alert2) {
    return (
      <Grid width="240px" height="156px" column padding="17px">
        <Grid column height="44px">
          <Text margin="20px 0px 0px 0px">앗!</Text>
          <Text margin="0px">{text}</Text>
        </Grid>
        <hr
          style={{
            width: "240px",
            borderTop: "1px solid gray",
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            margin: "30px 0px 0px 0px",
          }}
        />
        <Button is_close _onClick={onClose}>
          확인
        </Button>
      </Grid>
    );
  }

  if (Alert3) {
    return (
      <Grid width="240px" height="156px" column padding="17px">
        <Grid column height="44px">
          <Text margin="20px 0px 0px 0px">앗!</Text>
          <Text margin="0px">{text}</Text>
        </Grid>
        <hr
          style={{
            width: "240px",
            borderTop: "1px solid gray",
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            margin: "30px 0px 0px 0px",
          }}
        />
        <Button is_close _onClick={onClose}>
          확인
        </Button>
      </Grid>
    );
  }

  //참여중인 운동 메이트 프로필s
  if (Members) {
    return (
      <Grid width="342px" height="356px">
        <Grid height="auto" row>
          <Image
            shape="circle"
            src={props?.post?.memberImg}
            size={60}
            margin="3px"
          />
          <Grid column width="auto" height="60px">
            <Image src="./img/red_medal.png" />
            <Text margin="0px">{props?.post?.memberNickname}</Text>
            <Text margin="0px">
              {props?.post?.memberGen}/{props?.post?.memberAgee}
            </Text>
          </Grid>
        </Grid>
        <Grid row height="auto">
          {props?.post?.memberCategory.map((h, i) => {
            return (
              <Text
                br
                key={h + i}
                color="#000000"
                width="auto"
                row
                margin="20px 3px 5px 3px"
              >
                {h}
              </Text>
            );
          })}
        </Grid>

        <Text margin="20px 0px 0px 3px">{props?.post?.memberDesc}</Text>
        <button onClick={onClose}>Close</button>
      </Grid>
    );
  }

  //게시물 작성자 프로필
  return (
    <Grid width="342px" height="356px">
      <Grid height="auto" row>
        <Image
          shape="circle"
          src={props.post[0].memberImg}
          size={60}
          margin="3px"
        />
        <Grid column width="auto" height="60px">
          {/* 임의 */}
          <Image src="../img/purple.png" />
          <Text margin="0px">{props.post[0].memberNickname}</Text>
          <Text margin="0px">
            {props.post[0].memberGen}/{props.post[0].memberAgee}
          </Text>
        </Grid>
      </Grid>
      <Grid row height="auto">
        {props.post[0].memberCategory.map((h, i) => {
          return (
            <Text
              br
              key={h + i}
              color="#000000"
              width="auto"
              row
              margin="20px 3px 5px 3px"
            >
              {h}
            </Text>
          );
        })}
      </Grid>
      <Text margin="20px 0px 0px 3px">{props.post[0].memberDesc}</Text>
      <button onClick={onClose}>Close</button>
    </Grid>
  );
};

export default ModalData;

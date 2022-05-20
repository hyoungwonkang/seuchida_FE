import React, { useState } from "react";
import { Button, Text, Grid, Image } from "../../elements/Index";
import styled from "styled-components";
import ReviewWrite from "../../pages/ReviewWrite";

const ModalData = (props) => {
  const { Members, Alert, Check, text, onClose, onCheck, Evaluate } = props;

  console.log(props);

  //재확인 창
  if (Check) {
    return (
      <Grid width="240px" height="156px" column padding="17px">
        <Text margin="20px 0px 0px 0px">{text}</Text>
        <hr
          style={{
            width: "240px",
            borderTop: "1px solid gray",
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            margin: "40px 0px 0px 0px",
          }}
        />
        <Grid row justify="center">
          <Button is_close _onClick={onClose} margin="10px 38px 0px 0px">
            취소
          </Button>
          <div
            style={{
              display: "block",
              width: "1px",
              height: "57px",
              backgroundColor: "gray",
              position: "absolute",
              bottom: 0,
              left: "120px",
            }}
          />
          <Button is_close _onClick={onCheck} margin="10px 0px 0px 38px">
            확인
          </Button>
        </Grid>
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

  //참여자 평가 창
  if (Evaluate) {
    //신고하기
    const BadList = [
      { id: 0, data: "약속시간에 나타나지 않았어요." },
      { id: 1, data: "불친절해요." },
      { id: 2, data: "운동에 열심히 참여하지 않았어요." },
      { id: 3, data: "이성적인 만남을 유도해요." },
    ];

    return (
      <Grid width="342px" height="250px" padding="10px">
        <SelectBox>
          {BadList.map((item) => {
            return (
              <Content key={item.id} row>
                <input
                  id={item.id}
                  type="radio"
                  name="report"
                  value={item.data}
                  onChange={(e) => {
                    props.report(e.target.value);
                    props.rUserId(props.post.memberId);
                  }}
                />
                <label htmlFor={item.id}>
                  <Select color={+props._report.includes(item.data)}>
                    {item.data}
                  </Select>
                </label>
              </Content>
            );
          })}
          <Grid row height="20px" justify="right" padding="20px 5px 0px 0px">
            <Button
              is_close
              _onClick={() => {
                onClose();
              }}
            >
              취소
            </Button>
            <Button
              is_close
              _onClick={() => {
                props.addreport();
                onClose();
              }}
            >
              신고
            </Button>
          </Grid>
        </SelectBox>
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

const SelectBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  /* flex-wrap: wrap; */
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const Select = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
`;

const Line = styled.hr`
  width: "500px";
  height: "50%";
  border: 1px solid black;
`;

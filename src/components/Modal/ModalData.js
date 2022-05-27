import React, { useState } from "react";
import { Button, Text, Grid, Image } from "../../elements/Index";
import styled from "styled-components";
import { HiOutlineX, HiTranslate } from "react-icons/hi";

const ModalData = (props) => {
  const { Members, Alert, Check, Evaluate, text, onCheck, onClose, Survey } =
    props;

  if (Survey) {
    return (
      <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
        {/* close버튼 */}
        <Grid row justify="right" height="50px" position>
          <HiOutlineX size={38} onClick={onClose} />
        </Grid>
        <BannerBtn
          src="./img/bannerbutton.png"
          onClick={() => {
            onCheck();
          }}
        />

        <img alt="banner" src="./img/banner.png" style={{ width: "320px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            color: "white",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "white",
            }}
            onClick={() => {
              props.nottoday();
              onClose();
            }}
          >
            오늘 하루 더 이상 보지 않기 X
          </button>
        </div>
      </div>
    );
  }

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
          <Button
            is_close
            _onClick={() => {
              onCheck();
              onClose();
            }}
            margin="10px 0px 0px 38px"
          >
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
                props.rUserId(props.post.memberId);
                onCheck();
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

  const level = [
    { id: 1, level: 1, image: <Image src="../img/badge/red.png" /> },
    { id: 2, level: 2, image: <Image src="../img/badge/orange.png" /> },
    { id: 3, level: 3, image: <Image src="../img/badge/yellow.png" /> },
    { id: 4, level: 4, image: <Image src="../img/badge/green.png" /> },
    { id: 5, level: 5, image: <Image src="../img/badge/skyblue.png" /> },
    { id: 6, level: 6, image: <Image src="../img/badge/blue.png" /> },
    { id: 7, level: 7, image: <Image src="../img/badge/purple.png" /> },
  ];

  //참여중인 운동 메이트 프로필(레벨 넣어야함)
  if (Members) {
    return (
      <Grid width="342px" height="356px" padding="20px">
        {/* close버튼 */}
        <Grid row justify="right" height="30px">
          <HiOutlineX size={35} onClick={onClose} />
        </Grid>
        {/* 프로필내용 */}
        <Grid column height="200px">
          <Grid column height="100px">
            <Image
              shape="circle"
              src={props.post.memberImg || props.post.userImg}
              size={60}
              margin="3px"
            />
            <Grid row justify="center" height="auto">
              {level.map((v, i) => {
                if (
                  v.level == props.post.memberLevel ||
                  v.level == props.post.level
                )
                  return <div key={v + i}>{v.image}</div>;
              })}
              <Text margin="0px" bold size="24px">
                {props.post.memberNickname || props.post.nickName}
              </Text>
            </Grid>
          </Grid>

          {/* 카테고리 */}
          {props.post.userInterest ? (
            <Grid row height="auto" justify="center">
              {props.post.userInterest?.map((h, i) => {
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
          ) : (
            <Grid row height="auto" justify="center">
              {props.post.memberCategory?.map((h, i) => {
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
          )}
          <Grid>
            <Text margin="20px 0px 0px 3px">
              {props.post.memberDesc || props.post.userContent}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  //게시물 작성자 프로필
  return (
    <Grid width="342px" height="356px" padding="20px">
      {/* close버튼 */}
      <Grid row justify="right" height="30px">
        <HiOutlineX size={35} onClick={onClose} />
      </Grid>

      {/* 프로필내용 */}
      <Grid column height="200px">
        <Grid column height="100px">
          <Image
            shape="circle"
            src={props.post[0].memberImg}
            size={60}
            margin="3px"
          />
          <Grid row justify="center" height="auto">
            {level.map((v, i) => {
              if (v.level == props.post[0].memberLevel)
                return <div key={v + i}>{v.image}</div>;
            })}
            <Text margin="0px" bold size="24px">
              {props.post[0].memberNickname}
            </Text>
          </Grid>
        </Grid>

        {/* 카테고리 */}
        <Grid row height="auto" justify="center">
          {props.post[0].memberCategory?.map((h, i) => {
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
        <Grid>
          <Text margin="20px 0px 0px 3px">{props.post[0].memberDesc}</Text>
        </Grid>
      </Grid>
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

const BannerBtn = styled.img`
  width: 150px;
  background-image: url(".img/bannerbutton.png");
  position: absolute;
  bottom: 40px;
  left: 90px;
  cursor: pointer;
`;

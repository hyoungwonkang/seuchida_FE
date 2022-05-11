import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FooterMenu from "../shared/FooterMenu";
import { Grid, Text, GoBack } from "../elements/Index";

const PostCategory = (prop) => {
  const CategoryList = [
    { id: 0, data: "자전거", checked: false },
    { id: 1, data: "배드민턴", checked: false },
    { id: 2, data: "골프", checked: false },
    { id: 3, data: "볼링" },
    { id: 4, data: "테니스/스쿼시" },
    { id: 5, data: "탁구" },
    { id: 6, data: "스키/보드" },
    { id: 7, data: "헬스/크로스핏" },
    { id: 8, data: "요가/필라테스" },
    { id: 9, data: "당구/포켓볼" },
    { id: 10, data: "러닝/걷기" },
    { id: 11, data: "축구/풋살" },
    { id: 12, data: "농구" },
    { id: 13, data: "야구" },
    { id: 14, data: "배구" },
    { id: 15, data: "족구" },
    { id: 16, data: "태권도" },
    { id: 17, data: "검도" },
    { id: 18, data: "클라이밍" },
    { id: 19, data: "수영/스쿠버다이빙" },
    { id: 20, data: "서핑/웨이크보드/요트" },
    { id: 21, data: "크루즈보드" },
    { id: 22, data: "스케이트/인라인" },
    { id: 23, data: "기타" },
  ];

  // 데이터를 넣을 빈배열
  const [postCate, setPostCate] = useState("");
  const postCategory = postCate.toString();

  return (
    <Grid>
      <GoBack text="모임 만들기" path="/main" />
      <Text margin="0px 0px 10px 30px" size="24px">
        함께하고 싶은 <br />
        운동을 선택해주세요
      </Text>
      <Grid height="auto" column margin="24px 0px 0px 0px">
        <CateBox>
          {CategoryList.map((item) => {
            // console.log(item);
            return (
              <div key={item.id}>
                <input
                  id={item.id}
                  type="checkbox"
                  value={item.data}
                  onChange={(e) => {
                    setPostCate(e.target.value);
                  }}
                  //배열에 data가 있으면 true, 없으면 false
                  // checked={item.data}
                />
                <label htmlFor={item.id}>
                  <Cate color={+postCate.includes(item.data)}>{item.data}</Cate>
                </label>
              </div>
            );
          })}
          <Link
            to={{
              // pathname: '/postwrite1',
              state: { postCategory },
            }}
          >
            <FooterMenu next path="/postwrite1" text="다음" />
          </Link>
        </CateBox>
      </Grid>
    </Grid>
  );
};

const CateBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  label {
    display: inline-block;
  }
  input {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`;

const Cate = styled.div`
  width: auto;
  height: 30px;
  margin: 4px;
  padding: 4px 12px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  background: ${(props) => (props.color ? "lightgreen" : "white")};
`;

export default PostCategory;

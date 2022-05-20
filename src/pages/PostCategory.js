import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import FooterMenu from "../shared/FooterMenu";
import { Grid, Text, GoBack } from "../elements/Index";
import Modal from "../components/Modal/Modal";
import ModalData from "../components/Modal/ModalData";

const PostCategory = () => {
  document.body.style.overscrollBehavior = "none";
  const history = useHistory();

  if (history.action === "POP") {
    history.replace("/postcategory");
  }

  //새로고침 시 작성 첫 번째 페이지로 이동
  // if (document.readyState === "interactive") {
  //   window.onbeforeunload = function () {
  //     return "새로고침 경고";
  //   };
  //   history.replace("/main");
  // }

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  const CategoryList = [
    { id: 0, data: "자전거" },
    { id: 1, data: "배드민턴" },
    { id: 2, data: "볼링" },
    { id: 3, data: "골프" },
    { id: 4, data: "테니스/스쿼시" },
    { id: 5, data: "스키/보드" },
    { id: 6, data: "탁구" },
    { id: 7, data: "다이어트" },
    { id: 8, data: "헬스/크로스핏" },
    { id: 9, data: "복싱" },
    { id: 10, data: "요가/필라테스" },
    { id: 11, data: "당구/포켓볼" },
    { id: 12, data: "축구/풋살" },
    { id: 13, data: "러닝/마라톤" },
    { id: 14, data: "수영/스쿠버다이빙" },
    { id: 15, data: "서핑/웨이크보드/요트" },
    { id: 16, data: "농구" },
    { id: 17, data: "야구" },
    { id: 18, data: "배구" },
    { id: 19, data: "족구" },
    { id: 20, data: "검도" },
    { id: 21, data: "태권도/유도" },
    { id: 22, data: "클라이밍" },
    { id: 23, data: "크루즈보드" },
    { id: 24, data: "스케이트/인라인" },
    { id: 25, data: "기타" },
  ];

  // 데이터를 넣을 빈배열
  const [postCate, setPostCate] = useState("");
  let postCategory = postCate.toString();

  //유효성 검사
  const check = () => {
    if (!postCategory) {
      setIsOpen(true);
    } else {
      history.push("/postwrite1");
    }
  };
  // console.log(postCategory);

  return (
    <Grid>
      <GoBack text="모임 만들기" path="/main" />
      <Text bold margin="24px 0px 10px 30px" size="24px">
        함께하고 싶은 <br />
        운동을 선택해주세요
      </Text>
      <Grid height="auto" column margin="40px 0px 0px 0px">
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
                  // checked={postCate.includes(item.data) ? true : false}
                />
                <label htmlFor={item.id}>
                  <Cate color={+postCate.includes(item.data)}>{item.data}</Cate>
                </label>
              </div>
            );
          })}
          <Link to={{ state: { postCategory } }}>
            <FooterMenu next text="다음" state={check} />
          </Link>
          {/* 경고창 모달 */}
          <Modal open={isOpen}>
            <ModalData Alert onClose={() => setIsOpen(false)} />
          </Modal>
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
  height: auto;
  box-sizing: border-box;
  margin: 5px 3px;
  padding: 8px 13px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  background: ${(props) => (props.color ? "lightgreen" : "white")};
  color: ${(props) => (props.click ? "white" : "black")};
`;

export default PostCategory;

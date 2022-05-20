import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import FooterMenu from "../shared/FooterMenu";
import { Grid, Text, Input, GoBack } from "../elements/Index";
import Modal from "../components/Modal/Modal";
import ModalData from "../components/Modal/ModalData";

const PostWrite_1 = (props) => {
  //앱에서 페이지 새로고침 막기
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
  //   history.replace("/postcategory");
  // }

  const postCategory = props?.location?.state?.postCategory;

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  //제목과 설명 state
  let [postTitle, setPostTitle] = useState("");
  let [postDesc, setPostDesc] = useState("");

  const selectPostTitle = (e) => {
    if (e.target.value.length >= 60) {
      e.target.value = e.target.value.substr(0, 60);
    }
    setPostTitle(e.target.value);
  };
  const selectPostDesc = (e) => {
    if (e.target.value.length >= 200) {
      e.target.value = e.target.value.substr(0, 200);
    }
    setPostDesc(e.target.value);
  };

  //프로그레스바
  let count = 0;
  if (postTitle.length > 0) {
    count++;
  }

  //유효성 검사
  const check = () => {
    if (!postTitle || !postDesc) {
      setIsOpen(true);
    } else {
      history.push("/postwrite2");
    }
  };

  useEffect(() => {
    if (postTitle.length >= 20) {
      setIsOpen2(true);
    }
  }, [postTitle]);

  useEffect(() => {
    if (postDesc.length >= 200) {
      setIsOpen3(true);
    }
  }, [postDesc]);

  // console.log(postCategory);

  return (
    <div>
      <GoBack text="모임 만들기" path="/postcategory" />
      <Grid margin="24px 0px 40px 0px">
        <ProgressBar>
          <HighLight width={(count / 3) * 100 + "%"} />
        </ProgressBar>
      </Grid>
      <Text bold margin="0px 0px 0px 24px" size="16px">
        제목
      </Text>
      <Grid padding="8px 0px 20px 24px">
        <Input
          size="16px"
          height="56px"
          type="textarea"
          value={postTitle}
          maxLength="20"
          _onChange={selectPostTitle}
          placeholder="어떤 활동을 같이하고 싶나요?"
        />
        <Grid isFlex_end>
          <Text margin="4px 28px 0px 0px" size="12px" color="#787878">
            {postTitle.length}/20
          </Text>
        </Grid>
      </Grid>
      <Text bold margin="0px 0px 0px 24px" size="16px">
        설명
      </Text>
      <Grid padding="8px 0px 0px 24px">
        <Input
          size="16px"
          multiLine
          height="160px"
          type="textarea"
          value={postDesc}
          maxLength="200"
          _onChange={selectPostDesc}
          placeholder="스친과 함께하고 싶은 운동에 대해 설명해주세요."
        />
        <Grid isFlex_end>
          <Text margin="4px 28px 0px 0px" size="12px" color="#787878">
            {postDesc.length}/200
          </Text>
        </Grid>
      </Grid>
      <Link
        to={{
          state: {
            postTitle,
            postDesc,
            postCategory,
          },
        }}
      >
        <FooterMenu next text="다음" state={check} />
      </Link>
      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData
          Alert
          text="내용을 모두 입력해주세요"
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <Modal open={isOpen2}>
        <ModalData
          Alert
          text="20자 이하만 가능해요"
          onClose={() => setIsOpen2(false)}
        />
      </Modal>
      <Modal open={isOpen3}>
        <ModalData
          Alert
          text="200자 이하만 가능해요"
          onClose={() => setIsOpen3(false)}
        />
      </Modal>
    </div>
  );
};

const ProgressBar = styled.div`
  background: #eee;
  width: 85%;
  height: 4.5px;
  margin-left: 28px;
  margin-bottom: 28px;
`;

const HighLight = styled.div`
  background: #0ed88b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_1;

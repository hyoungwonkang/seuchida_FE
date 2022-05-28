import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Image, Input, Text, GoBack } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";
import styled from "styled-components";
import { AiFillCalendar } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";

const ReviewWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypageActions.myPostOneDB(postId));
  }, []);

  //이미지 가져오기
  const postInfo = useSelector((state) => state.mypage.myPostOne);
  const postId = props.match.params.postId;

  //로컬 값 불러오기(4)
  const localreview = localStorage.getItem("review");
  const localreviewImg = localStorage.getItem("reviewImg");

  useEffect(() => {
    setPreview(localreviewImg ? localreviewImg : "");
    setReviewImg(localreviewImg ? localreviewImg : "");
    setReview(localreview ? localreview : "");
  }, [localreviewImg, localreview]);

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  //페이지 값
  const [preview, setPreview] = useState("");
  const [reviewImg, setReviewImg] = useState("");
  const [review, setReview] = useState("");

  //특수 문자 제한
  const notSpecial = /[^/!/~/./,\sㄱ-ㅎ가-힣a-z0-9]/gi;

  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setReviewImg(e.target.files[0]);
  };

  const writeReview = (e) => {
    if (e.target.value.length >= 100) {
      e.target.value = e.target.value.substr(0, 100);
    }
    setReview(e.target.value.replace(notSpecial, ""));
  };

  //빈값 유효성 검사
  const alert = (e) => {
    if (review === "") {
      setIsOpen(true);
    } else {
      //로컬 값 저장
      localStorage.setItem("review", review);
      //이미지 추가
      if (reviewImg === localreviewImg) {
        history.push("/reviewevalue");
      } else {
        const formData = new FormData();
        formData.append("image", reviewImg);
        dispatch(mypageActions.addPhotoDB(formData));
        history.push("/reviewevalue");
      }
    }
  };

  //글자수 100글자 제한
  useEffect(() => {
    if (review?.length >= 100) {
      setIsOpen2(true);
    }
  }, [review]);

  //뒤로가기 시 로컬 값 삭제
  const remove = () => {
    localStorage.removeItem("review");
    localStorage.removeItem("reviewImg");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
    localStorage.removeItem("report");
  };

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.removeItem("review");
    localStorage.removeItem("reviewImg");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
    localStorage.removeItem("report");

    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
  }

  return (
    <>
      <Container>
        <Grid bg="white">
          <GoBack text="후기 작성하기" path="/mypage" remove={remove} />
          <Grid height="950px">
            {/* 포스트 내용  */}
            <Grid height="46px" width="342px" margin="0px 0px 0px 25px">
              <Text size="18px" bold>
                {postInfo?.postTitle}
              </Text>
            </Grid>
            <Grid border="1px solid gray" height="92px" padding="15px 22px">
              <Text margin="0px" size="14px">
                <MdPlace color="#787878" /> {postInfo?.spot}
              </Text>
              <Text margin="0px" size="14px">
                <BiDumbbell color="#787878" /> {postInfo?.postCategory}
              </Text>
              <Text margin="0px" size="14px">
                <AiFillCalendar color="#787878" /> {postInfo?.datemate}
              </Text>
            </Grid>

            {/* 사진추가 */}
            <FileUpload>
              <label htmlFor="image">
                <Image
                  cursor
                  shape="rectangle"
                  size={39}
                  position="relative"
                  alt="profile"
                  // z-index
                  src={
                    preview
                      ? preview
                      : localreviewImg
                      ? localreviewImg
                      : "../img/addimage.png"
                  }
                />
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  selectPreview(e);
                  selectImage(e);
                }}
              />
            </FileUpload>

            {/* 후기작성 */}
            <Grid column margin="20px auto" height="auto">
              <Input
                multiLine
                type="text"
                placeholder="후기를 작성해주세요:)"
                height="160px"
                _onChange={writeReview}
                value={review || ""}
              />
              <Text
                size="16px"
                color="#787878"
                margin="0px 0px 0px 300px"
                height="auto"
              >
                {review?.length}/100
              </Text>
            </Grid>
          </Grid>

          {/* 다음 버튼 */}
          <FooterMenu next text="다음" state={alert} />

          {/* 글자수 모달 */}
          <Modal open={isOpen2}>
            <ModalData
              Alert
              onClose={() => setIsOpen2(false)}
              text="100글자 이하로 작성해주세요!"
            />
          </Modal>

          {/* 경고창 모달 */}
          <Modal open={isOpen}>
            <ModalData
              Alert
              onClose={() => setIsOpen(false)}
              text="내용을 모두 입력해 주세요!"
            />
          </Modal>
        </Grid>
      </Container>
    </>
  );
};

export default ReviewWrite;

const Container = styled.div`
  padding-top: 0px;
`;

const FileUpload = styled.div`
  margin: 0px 0px 50px 0px;
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

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
  const _preview = localStorage.getItem("image");
  const postId = props.match.params.postId;

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  const [preview, setPreview] = useState(_preview);
  const [review, setReview] = useState(localStorage.getItem("review"));
  const [reviewImg, setReviewImg] = useState("");

  //로컬 값 삭제
  const remove = () => {
    localStorage.removeItem("review");
    localStorage.removeItem("image");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
  };

  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setReviewImg(e.target.files[0]);
    //사진 추가
  };

  const writeReview = (e) => {
    if (e.target.value.length >= 100) {
      e.target.value = e.target.value.substr(0, 100);
    }
    setReview(e.target.value);
  };

  //빈값 유효성 검사
  const alert = (e) => {
    if (review === "") {
      setIsOpen(true);
    } else {
      //로컬 값 저장
      localStorage.setItem("review", review);
      //이미지 추가
      const formData = new FormData();
      formData.append("image", reviewImg);
      dispatch(mypageActions.addPhotoDB(formData));
      history.push("/reviewevalue");
    }
  };

  if (review?.length >= 100) {
    window.alert("100글자 이내로 작성해주세요:)");
  }

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.removeItem("review");
    // localStorage.removeItem("nickName");
    // localStorage.removeItem("gender");
    // localStorage.removeItem("age");
    // localStorage.removeItem("content");
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
  }

  return (
    <Grid>
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
              shape="rectangle"
              size={39}
              position="relative"
              alt="profile"
              // z-index
              src={preview ? preview : "../img/addimage.png"}
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

      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData
          Alert
          onClose={() => setIsOpen(false)}
          text="내용을 모두 입력해 주세요!"
        />
      </Modal>
    </Grid>
  );
};

export default ReviewWrite;

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

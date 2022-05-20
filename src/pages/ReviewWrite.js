import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Image, Input, Text, GoBack } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import axios from "axios";

const ReviewWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const postId = props.match.params.postId;

  const [postInfo, setPostInfo] = useState();

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/reviewPost/${postId}`,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
  
        const _postInfo = res.data.post;
        setPostInfo(_postInfo);
      })
      .catch((err) => {
        console.log("mypostone에 실패했습니다.", err);
      });
  }, []);

  const [preview, setPreview] = useState("");
  const [review, setReview] = useState("");
  const [reviewImg, setReviewImg] = useState("");

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
    setReview(e.target.value);
  };

  //빈값 유효성 검사
  const alert = (e) => {
    if (review === "" || reviewImg === "") {
      setIsOpen(true);
    } else {
      history.push("/revieweval");
    }
  };

  if (review?.length >= 100) {
    window.alert("100글자 이내로 작성해주세요:)");
  }

  return (
    <Grid>
      <GoBack text="후기 작성하기" path="/mypage" />
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
      <Link
        to={{
          state: {
            review,
            reviewImg,
            postInfo,
          },
        }}
      >
        <FooterMenu next text="다음" state={alert} />
      </Link>

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

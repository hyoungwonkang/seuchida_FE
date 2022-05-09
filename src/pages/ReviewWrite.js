import React, { useState } from "react";
import { Grid, Image, Input, Text , GoBack} from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";

const ReviewWrite = () => {
  const GoodList = [
    { id: 0, data: "친절하고 매너가 좋아요" },
    { id: 1, data: "시간약속을 잘 지켜요" },
    { id: 2, data: "다음에도 같이 하고 싶어요" },
  ];

  const BadList = [
    { id: 0, data: "불친절하고 매너가 좋지 않아요" },
    { id: 1, data: "노쇼했어요:(" },
    { id: 2, data: "다음에 같이 하고 싶지 않아요" },
  ];

  const [review, setReview] = useState();
  const [preview, setPreview] = useState("");
  const [reviewImg, setReviewImg] = useState();
  const [userEvalu, setUserEvalu] = useState();

  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setReviewImg(e.target.files[0]);
  };

  const Review = (e) => {
    setReview(e.target.value);
  };

  const addReviewWrite = () => {
    const formData = new FormData();
    formData.append("userImg", reviewImg);
    formData.append("Review", review);
    // formData.append("userGender", gender);
    // formData.append("userAge", ag  e);
    // formData.append("userContent", content);
    // formData.append("address", address);
    // for (var i = 0; i < userInterest.length; i++) {
    //   formData.append("userInterest[]", userInterest[i]);
    //   console.log(userInterest[i]);
    // }
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // dispatch(userActions.signupDB(formData));
  };

  return (
    <Grid>
      <GoBack text="후기 작성하기" path="/mypage" />
      <Grid height="500px">
        <Grid height="auto" padding="0px 20px">
          <Text color="gray">배드민턴 칠 사람!</Text>
        </Grid>
        <Grid border="1px solid gray" height="92px" padding="15px 20px">
          <Text margin="0px">배드민턴</Text>
          <Text margin="0px">5월2일, 06:00 오후</Text>
          <Text margin="0px">여성만, 20세-29세</Text>
        </Grid>
        <Image
          shape="rectangle"
          size={39}
          position="relative"
          alt="profile"
          src={preview ? preview : "https://ifh.cc/g/SCJaxK.png"}
        />
        <FileUpload>
          <label htmlFor="image">
            <AiFillPlusCircle size={32} />
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
        <Grid column margin="20px auto" height="auto">
          <Input
            placeholder="후기를 작성해주세요:)"
            height="160px"
            _onChange={Review}
          />
        </Grid>

        <Grid width="342px" margin="auto">
          <Text>함께한 운동메이트는 어땠나요?</Text>

          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={32}
            margin="3px"
          />
          <Input placeholder="후기를 작성해주세요:)" height="50px" />
          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={32}
            margin="3px"
          />
          <Input placeholder="후기를 작성해주세요:)" height="50px" />
          <Image
            shape="circle"
            src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
            size={32}
            margin="3px"
          />
          <Input placeholder="후기를 작성해주세요:)" height="50px" />
        </Grid>
      </Grid>
      <FooterMenu next text="후기 작성하기" path="/" />
    </Grid>
  );
};

export default ReviewWrite;

const FileUpload = styled.div`
  margin: 0px 0px 50px 0px;
  label {
    position: absolute;
    top: 150px;
    right: 150px;
  }
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

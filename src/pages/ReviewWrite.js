import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Grid, Image, Input, Text } from '../elements/Index';
import GoBack from '../elements/GoBack';
import FooterMenu from '../shared/FooterMenu';
import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi';
import { actionCreators as mypageActions } from '../redux/modules/mypage';

const ReviewWrite = (props) => {
  const dispatch = useDispatch();

  const postId = props.match.params.postId;

  const GoodList = [
    { id: 0, data: '친절하고 매너가 좋아요' },
    { id: 1, data: '시간약속을 잘 지켜요' },
    { id: 2, data: '다음에도 같이 하고 싶어요' },
  ];
  const BadList = [
    { id: 0, data: '불친절하고 매너가 좋지 않아요' },
    { id: 1, data: '노쇼했어요:(' },
    { id: 2, data: '다음에 같이 하고 싶지 않아요' },
  ];

  const [review, setReview] = useState('');
  const [preview, setPreview] = useState('');
  const [reviewImg, setReviewImg] = useState('');
  // const [userEvalu, setUserEvalu] = useState();

  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setReviewImg(e.target.files[0]);
  };

  const writeReview = (e) => {
    setReview(e.target.value);
    console.log(e.target.value);
  };

  const addReview = () => {
    const formData = new FormData();
    formData.append('userImg', reviewImg);
    formData.append('Review', review);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    dispatch(mypageActions.addReviewDB(formData));
  };

  return (
    <Grid>
      <GoBack text='후기 작성하기' path='/mypage' />
      <Grid height='900px'>
        <Grid height='auto' width='342px' margin='auto'>
          <Text color='gray'>배드민턴 칠 사람!</Text>
        </Grid>
        <Grid border='1px solid gray' height='92px' padding='15px 22px'>
          <Text margin='0px'>배드민턴</Text>
          <Text margin='0px'>5월2일, 06:00 오후</Text>
          <Text margin='0px'>여성만, 20세-29세</Text>
        </Grid>
        <Image
          shape='rectangle'
          size={39}
          position='relative'
          alt='profile'
          src={preview ? preview : './img/blank_img.png'}
        />
        <FileUpload>
          <label htmlFor='image'>
            <Grid column>
              <HiPlus size={60} />
              <Text size='16px' color='gray' margin='auto'>
                사진 추가하기
              </Text>
            </Grid>
          </label>
          <input
            type='file'
            id='image'
            onChange={(e) => {
              selectPreview(e);
              selectImage(e);
            }}
          />
        </FileUpload>
        <Grid column margin='20px auto' height='auto'>
          <Input
            multiLine
            type='text'
            placeholder='후기를 작성해주세요:)'
            height='160px'
            _onChange={writeReview}
            value={review || ''}
          />
        </Grid>

        {/* <Grid  width="342px" margin="auto" height="0px">
          <Text>함께한 운동메이트는 어땠나요?</Text>
          <Text size="14px">칭찬하고 싶은 사람을 칭찬해 주세요!</Text>
          <Grid row bg="green">
            <Image
              shape="circle"
              src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
              size={32}
              margin="3px"
            />
            <Image
              shape="circle"
              src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
              size={32}
              margin="3px"
            />
            <Image
              shape="circle"
              src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"
              size={32}
              margin="3px"
            />
          </Grid>
        </Grid> */}
      </Grid>
      <FooterMenu next text='후기 작성하기' path='/' event={addReview} />
    </Grid>
  );
};

export default ReviewWrite;

const FileUpload = styled.div`
  margin: 0px 0px 50px 0px;
  label {
    position: absolute;
    top: 360px;
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

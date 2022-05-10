import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterMenu from '../shared/FooterMenu';
import { Grid, Text, Input } from '../elements/Index';
import GoBack from '../components/GoBack';

const PostWrite_1 = (props) => {
  const postCategory = props?.location?.state?.postCategory;

  //제목과 설명 state
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const selectPostTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const selectPostDesc = (e) => {
    setPostDesc(e.target.value);
  };

  //프로그레스바
  let count = 0;
  if (postTitle.length > 0) {
    count++;
  }

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postcategory' />
      <ProgressBar>
        <HighLight width={(count / 3) * 100 + '%'} />
      </ProgressBar>
      <Text margin='0px 0px 0px 24px' size='16px'>
        제목
      </Text>
      <Grid padding='8px 0px 28px 24px'>
        <Input
          type='textarea'
          value={postTitle}
          maxLength='60'
          _onChange={selectPostTitle}
          placeholder='어떤 활동을 같이하고 싶나요?'
        />
        <Grid margin='0px 0px 0px 310px'>
          <Text size='12px' color='#787878'>
            {postDesc.length}/60
          </Text>
        </Grid>
      </Grid>
      <Text margin='0px 0px 0px 24px' size='16px'>
        설명
      </Text>
      <Grid padding='8px 0px 0px 24px'>
        <Input
          multiline
          height='160px'
          type='textarea'
          value={postDesc}
          maxLength='200'
          _onChange={selectPostDesc}
          placeholder='스친과 함께하고 싶은 운동에 대해 설명해주세요.'
        />
        <Grid margin='0px 0px 0px 310px'>
          <Text size='12px' color='#787878'>
            {postDesc.length}/200
          </Text>
        </Grid>
      </Grid>
      <Link
        to={{
          // pathname: '/postwrite2',
          state: {
            postTitle,
            postDesc,
            postCategory,
          },
        }}
      >
        <FooterMenu next path='/postwrite2' text='다음' />
      </Link>
    </Grid>
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
  background: black;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_1;

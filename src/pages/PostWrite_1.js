import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../shared/FooterMenu';
import { Grid, Text, Input, GoBack } from '../elements/Index';

const PostWrite_1 = (props) => {
  const history = useHistory();

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

  //유효성 검사
  const check = () => {
    if (!postTitle || !postDesc) {
      window.alert('입력창에 내용을 넣어주세요');
    } else {
      history.push('/postwrite2');
    }
  };

  // 새로고침시 데이터를 유지합니다.
  useEffect(() => {
    setPostTitle(window.localStorage.getItem('postTitle'));
    setPostDesc(window.localStorage.getItem('postDesc'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('postTitle', postTitle);
  }, [postTitle]);
  useEffect(() => {
    window.localStorage.setItem('postDesc', postDesc);
  }, [postDesc]);

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postcategory' />
      <Grid margin='24px 0px 40px 0px'>
        <ProgressBar>
          <HighLight width={(count / 3) * 100 + '%'} />
        </ProgressBar>
      </Grid>
      <Text margin='0px 0px 0px 24px' size='16px'>
        제목
      </Text>
      <Grid padding='8px 0px 20px 24px'>
        <Input
          size='16px'
          height='56px'
          type='textarea'
          value={postTitle}
          maxLength='60'
          _onChange={selectPostTitle}
          placeholder='어떤 활동을 같이하고 싶나요?'
        />
        <Grid margin='0px 0px 0px 310px'>
          <Text size='12px' color='#787878'>
            {postTitle.length}/60
          </Text>
        </Grid>
      </Grid>
      <Text margin='0px 0px 0px 24px' size='16px'>
        설명
      </Text>
      <Grid padding='8px 0px 0px 24px'>
        <Input
          size='16px'
          multiLine
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
      <FooterMenu next text='다음' state={check} />
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
  background: #0ed88b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_1;

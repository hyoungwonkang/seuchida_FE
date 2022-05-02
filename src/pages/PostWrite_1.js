import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import gBack from '../shared/ImgBox/gBack.png';

const PostWrite_1 = (props) => {
  const history = useHistory();
  const postCategory = props.location.state.postCategory;
  console.log(postCategory);

  //제목과 설명 state
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const selectPostTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const selectPostDesc = (e) => {
    setPostDesc(e.target.value);
  };

  return (
    <>
      <Container>
        <HeadWarp>
          <Gback>
            <img src={gBack} />
          </Gback>
          <HeadTitle>모임 만들기</HeadTitle>
        </HeadWarp>
        <Title>제목</Title>
        <TitleInput
          type='textarea'
          value={postTitle}
          maxLength='60'
          onChange={selectPostTitle}
          placeholder='어떤 활동을 같이하고 싶나요?'
        />
        <Desc>설명</Desc>
        <TitleInput
          type='textarea'
          value={postDesc}
          maxLength='200'
          onChange={selectPostDesc}
          placeholder='스친과 함께하고 싶은 운동에 대해 설명해주세요.'
        />
        <Link
          to={{
            pathname: '/postwrite2',
            state: { postTitle, postDesc, postCategory },
          }}
        >
          <Next
            onClick={() => {
              history.push('/postwrite2');
            }}
          >
            다음
          </Next>
        </Link>
      </Container>
    </>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

const HeadWarp = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
`;
const Gback = styled.div``;

const HeadTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.div``;

const TitleInput = styled.input``;

const Desc = styled.div``;

const Next = styled.button`
  width: 350px;
  height: 45px;
  margin-top: 10%;
  border: none;
  background: gray;
`;

export default PostWrite_1;

import React from 'react';
import styled from 'styled-components'
import { Card } from '../components/index';
const PostDetail = () => {
  return (
    <>
      <Profile src="https://t1.daumcdn.net/cfile/tistory/212E043B5815E35605"></Profile>
      <Card/>
    </>
  );
};

export default PostDetail;

const Profile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 15px;
  margin-right: 5px;
`;


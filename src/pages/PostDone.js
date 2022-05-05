import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';

const PostDone = () => {
  const history = useHistory();
  return (
    <>
      <LoginHead>
        <Title>모집 등록이 완료되었습니다!</Title>
        <SubTitle>
          내가 만든 모임은 마이페이지에서 <br /> 확인할 수 있어요
        </SubTitle>
      </LoginHead>
      <Button
        _onClick={() => {
          history.push('/main');
        }}
      >
        확인
      </Button>
    </>
  );
};

const LoginHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 0px 200px 0px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export default PostDone;

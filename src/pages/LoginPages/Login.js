import React from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from '../../shared/OAuth';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();
  return (
    <>
      <Container>
        <LoginHead>
          <SubTitle>나와 가장 가까운 스포츠 친구</SubTitle>
          <Title>스치다!</Title>
        </LoginHead>
        <JustButton
          onClick={() => {
            history.push('/main');
          }}
        >
          그냥 둘러볼게요!
        </JustButton>
        <KakaoButton>
          <A href={KAKAO_AUTH_URL}>카카오로 시작하기</A>
        </KakaoButton>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 0px 0px 0px;
`;

const LoginHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 0px 200px 0px;
`;

const SubTitle = styled.h3`
  font-size: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

const KakaoButton = styled.button`
  background: #b0b0b0;
  width: 350px;
  border: none;
  font-size: 19px;
  padding: 20px 50px;
  font-weight: 700;
  cursor: pointer;
`;

const A = styled.a`
  text-decoration-line: none;
  color: white;
`;

const JustButton = styled.button`
  background: #e5e5e5;
  width: 350px;
  border: 1px solid black;
  font-size: 19px;
  margin: 0px 0px 5px 0px;
  padding: 20px 50px;
  font-weight: 700;
  cursor: pointer;
`;

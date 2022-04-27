import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const SignupDone = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <SignupHead>
          <Title>
            회원가입이 <br /> 완료되었습니다!
          </Title>
          <SubTitle>
            내 동네를 설정하고 <br /> 가장 가까운 운동메이트를 찾아보세요!
          </SubTitle>
        </SignupHead>
        <KakaoButton>
          <A href=''>내 동네 설정하고 시작하기</A>
        </KakaoButton>
        <JustButton
          onClick={() => {
            history.push('/main');
          }}
        >
          그냥 둘러볼게요!
        </JustButton>
      </Container>
    </>
  );
};

export default SignupDone;

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 0px 300px 0px;
`;

const SignupHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 0px 100px 0px;
`;

const SubTitle = styled.h3`
  font-size: 16.5px;
  white-space: pre-line;
`;

const Title = styled.h1`
  font-size: 25px;
  white-space: pre-line;
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
  margin: 5px 0px 0px 0px;
  padding: 20px 50px;
  font-weight: 700;
  cursor: pointer;
`;

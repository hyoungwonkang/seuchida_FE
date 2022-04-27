import React from 'react';
import { KAKAO_AUTH_URL } from '../../shared/OAuth';
import kakaologo from '../../images/kakao.png';

const Login = (props) => {
  return (
    <div>
      <h3>나와 가장 가까운 스포츠 친구</h3>
      <h1>스치다!</h1>
      <a href={KAKAO_AUTH_URL}>
        <img src={kakaologo}></img>
      </a>
    </div>
  );
};

export default Login;

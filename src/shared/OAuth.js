// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음

export const CLIENT_ID = "5498cafd5af35c66b35808e2b9e12971";
export const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

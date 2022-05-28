// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음

export const KAKAO_CLIENT_ID = "5498cafd5af35c66b35808e2b9e12971";
export const KAKAO_REDIRECT_URI = "https://seuchida.shop/oauth/callback/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const GOOGLE_CLIENT_ID =
  "971208839251-jensilevsnhs8ncs6lq174h03c7gknp1.apps.googleusercontent.com";
export const GOOGLE_REDIRECT_URI =
  "https://seuchida.shop/oauth/callback/google/";
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code`;

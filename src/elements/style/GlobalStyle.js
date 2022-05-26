import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
		/* 프로젝트 내 모든 a 태그에 공통적으로 적용 */
    /* a { 
        text-decoration: none;
    } */
		/* 프로젝트 내 모든 엘리먼트에 공통적으로 적용 */
    /* * {
        box-sizing: border-box;
    } */
		/* 프로젝트 내 body 태그 안에 공통적으로 적용 */
    *{
        /* font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
        font-family: 'Noto Sans KR', sans-serif;
        /* font-size: 14px; */
        /* background-color: black; */
    }
  
`;
export default GlobalStyles;

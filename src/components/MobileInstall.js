// import React from "react";
// import styled from "styled-components";
// import PwaInstall from "../components/PwaInstall";

// const MobileInstall = (props) => {
//   const { _onClick } = props;

//   return (
//     <Content>
//       <h2>테스트</h2>
//       <p>
//         테스트 <br /> 테스트!
//       </p>
//       <>
//         <PwaInstall text="앱 다운로드" />
//       </>
//     </Content>
//   );
// };

// MobileInstall.defaultProps = {
//   _onClick: () => {},
// };

// const Content = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: url("/img/rectangle526.png");
//   background-size: cover;
//   background-position: 0%, 0%;
//   background-repeat: no-repeat;
//   text-align: center;
//   padding-top: 35%;
//   box-sizing: border-box;
//   & h2 {
//     color: #ffc710;
//     font-family: "Noto Sans KR", sans-serif !important;
//     font-size: ${({ theme }) => theme.fontSizes.lg};
//     font-weight: ${({ theme }) => theme.fontWeight.Bold};
//     margin: 0px 0 4%;
//   }
//   & p {
//     color: ${({ theme }) => theme.colors.main_2};
//     font-family: "Noto Sans KR", sans-serif !important;
//     font-weight: ${({ theme }) => theme.fontWeight.Bold};
//     font-size: ${({ theme }) => theme.fontSizes.base};
//     line-height: ${({ theme }) => theme.lineHeight.small};
//     margin: 18% 0;
//   }
//   @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
//     padding-top: 20%;
//     h2 {
//       font-size: ${({ theme }) => theme.fontSizes.base};
//     }
//     p {
//       margin: 14% 0;
//     }
//   }
// `;

// export default MobileInstall;

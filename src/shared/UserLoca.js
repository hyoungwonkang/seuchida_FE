// import React from 'react';

// const UserLoca = () => {
//   const [state, setState] = React.useState({
//     center: {
//       lat: 33.450701,
//       lng: 126.570667,
//     },
//     errMsg: null,
//     isLoading: true,
//   });
//   if (navigator.geolocation) {
//     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setState((prev) => ({
//           ...prev,
//           center: {
//             lat: position.coords.latitude, // 위도
//             lng: position.coords.longitude, // 경도
//           },
//           isLoading: false,
//         }));
//       },
//       (err) => {
//         setState((prev) => ({
//           ...prev,
//           errMsg: err.message,
//           isLoading: false,
//         }));
//       }
//     );
//   } else {
//     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
//     setState((prev) => ({
//       ...prev,
//       errMsg: "geolocation을 사용할수 없어요..",
//       isLoading: false,
//     }));
//   }
//   return (
//     <div>
      
//     </div>
//   );
// };

// export default UserLoca;
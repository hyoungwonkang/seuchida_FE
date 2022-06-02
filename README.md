# 스치다!
  ![스치다 로고 1](https://practice2082.s3.ap-northeast-2.amazonaws.com/Slide+16_9+-+1+(4).png)



## 📍 바로가기
- 사이트 바로가기 : https://seuchida.shop
- 발표 영상 :

<br>

## 🎉 스치다 서비스 소개

### 시연 영상
- 영상 링크 : https://www.youtube.com/watch?v=FU58mt06fc4

### 1. 우리 동네 스포츠 친구찾기 서비스
  <details> <summary>실시간 위치기반 서비스로 현재 내 위치를 기준으로 주변 운동친구들을 찾아주는 서비스입니다!</summary> <div markdown="1"> <img width='25%' src='https://practice2082.s3.ap-northeast-2.amazonaws.com/%EB%A6%AC%EB%93%9C%EB%AF%B8+%EC%9D%B4%EB%AF%B8%EC%A7%801.png'> </div>   </details>


### 2. 혼자하기 힘든 운동들도 스치다를 통해 같이 운동할 수 있습니다!
<details> <summary>운동 종목과 운동할 장소, 시간을 정해서 같이 운동할 사람을 모집할 수 있습니다.</summary> <img width='25%' src='https://practice2082.s3.ap-northeast-2.amazonaws.com/%EB%A6%AC%EB%93%9C%EB%AF%B8+%EC%9D%B4%EB%AF%B8%EC%A7%802.png'> </details>

<br>

## 🏛 서비스 아키텍처   

![서비스 아키텍처 (2)](https://practice2082.s3.ap-northeast-2.amazonaws.com/%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90+final.png)

## 💠 기술스택
<br>
<p align="center">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
<img src="https://img.shields.io/badge/slick-1572B6?style=for-the-badge&logo=slick&logoColor=white">
<img src="https://img.shields.io/badge/pwa-1572B6?style=for-the-badge&logo=pwa&logoColor=white">
<img src="https://img.shields.io/badge/Axios-pink?style=for-the-badge&logo=Axios&logoColor=black">
<br>
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=CloudFront&logoColor=white">
<img src="https://img.shields.io/badge/Route53-E68B49?style=for-the-badge&logo=Route53s&logoColor=white">
<img src="https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=S3&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-569A31?style=for-the-badge&logo=styledcomponents&logoColor=white">
<br>
<br>
<br>

| Library | Appliance |
| --- | --- |
| axios | 서버 통신 |
| redux-thunk | 상태관리, 미들웨어 |
| connected-react-router | history 객체 관리 |
| socket.io-client | 실시간 채팅 및 알람 |  
| styled-component | 컴포넌트 스타일링 |
| moment | 현재 시간 핸들링 |
| react-slick | 슬라이드에 사용 |
| react-pwa-install | 웹 앱 구현 |
| browser-image-compression | 이미지 리사이징 |
  
## 🚨 트러블 슈팅

### 1. 소셜 로그인
 <details>
  <summary> 구글 로그인 시 callback URI 설정 문제</summary>
   
  * 문제 상황 
    - 카카오 로그인과는 다르게 구글 Userinfo의 스코프를 callback URI와 이어지지 않게 해야했습니다.(ex. google/callbackuserinfo)
  * 해결 방안
    - 그리하여 callback URI의 끝나는 부분에 ‘/’를 주어 구분함으로서 해결 할 수 있었습니다.
  * 의견 조율 및 결정
    - 백엔드와의 토큰값을 주고받는 과정에서 발생한 mismatch uri를 확인해 가며 수정을 하는 것이 필요하다고 상의했습니다.
 </details>
 <details>
  <summary> 배포 후 구글 로그인 이용 문제</summary>
  
  * 문제 상황
    - 테스트유저 외의 일반유저도 로그인을 할 수 있게 앱 게시 허가를 받아야 했습니다. 하지만 구글과 컨택 메일을 주고 받으며 충족요건을 채우는데는 시간적인 한계가 있었습니다.(2주)
  * 해결 방안
    - 그리하여 테스트 모드만으로도 일반 유저가 사용할 수 있나 시험해 본 결과 앱 게시를 안 해도 로그인을 사용 할 수 있게 된 것을 발견하여 그대로 진행 할 수 있었습니다.
  * 의견 조율 및 결정
    - 테스트 모드로는 배포 할 수 없을 것으로 판단하여 일반 로그인으로 대체하자고 의견을 모았으나 테스트모드도 가능하여 그대로 진행했습니다.
 </details>

### 2. 지도맵 구현
 <details>
  <summary>지도맵 마커표시+지도검색 혼합기능 구현 문제</summary>
  
  * 문제 상황
    - 지도에 직접 장소를 표시할 수 있는 기능과 검색을 통해 나오는 장소가 나오게 하는 기능을 동시에 구현하기에는 리액트용 sdk 패키지로는 한계가 있었습니다.
  * 해결 방안
    - 그리하여 현재위치 지도와 검색 후 보여주는 지도를 웹용 라이브러리로 구현하고 검색 지도에도 직접 마커를 표시할 수 있게 구현하였습니다.
  * 의견 조율 및 결정
    - 리액트용 sdk 패키지와 웹용 라이브러리를 혼합하여 구현하는 시도가 있었고 그 결과 어려움이 있어서 더 복잡하지만 기능 구현을 할 수 있는 웹용 라이브러리만 쓰기도 결정하였습니다.
 </details>
  
### 3. 로딩 속도 최적화 
 <details>
  <summary>페이지 로딩 속도 최적화</summary>
  
  * 문제 상황
    - 페이지 로딩 속도가 느려 화면이 천천히 뜸 
  * 해결 방안
    - 코드 분할
    - 레이지 로딩 
    - 대용량 기본 이미지 압축 
    - 웹폰트 최적화
    - 불필요한 코드 정리 
  * 의견 조율 및 결정
    - 위 5가지 해결방안(코드 스플리팅, 레이지 로딩, 이미지 압축, 웹폰트 최적화, 코드 정리) 모두 적용하여 로딩 속도 현저히 상승. 
    - <img src="https://ifh.cc/g/JvJnaD.png">
 </details>
 <details>
  <summary>이미지 리사이징</summary>
   
  * 문제 상황 
    - 페이지 로딩 시 이미지가 천천히 뜨는 현상 발생 
  * 해결 방안 
    - 레이지 로딩 
    - 이미지 압축(browser-image-compression) 
  * 의견 조율 및 결정 
    - 앞서 적용시킨 레이지 로딩에도 불구하고 문제상황 해결 안됨 => 라이브러리(browser-image-compression)를 적용해 업로드 시의 이미지를 압축하였고 이전 대비 문제 상황 개선  
    - <img src="https://ifh.cc/g/X67w2T.png"><img src="https://ifh.cc/g/2skngC.png">
 </details>


<br>

## 📌 팀원소개



| Name     | GitHub                             | Position  |
| -------- | ---------------------------------- | --------- |
| 이태훈🔰   | https://github.com/hoontail          | 프론트엔드 |
| 강형원   | https://github.com/hyoungwonkang           | 프론트엔드 |
| 최정원   | https://github.com/carrot31       | 프론트엔드 |
| 신상렬🔰   | https://github.com/gofl26        | 백엔드     |
| 윤영수   | https://github.com/tayyoon         | 백엔드     |
| 김연유   |  https://github.com/gitmackenzie      | 백엔드     |
| 장유진   | https://www.notion.so/Eugene-e1d9ac3124fe426ab29ce979daa88907                                  | 디자인     |
| 이수림   | -                                   | 디자인     |

<br />

# 스치다!
  ![스치다 로고 1](https://practice2082.s3.ap-northeast-2.amazonaws.com/%EC%8A%A4%EC%B9%98%EB%8B%A4%EC%9D%B4%EB%AF%B8%EC%A7%80.png)




<p align='center'>
  <img src='https://img.shields.io/badge/Javascript-ES6-yellow?logo=javascript'/>
  <img src='https://img.shields.io/badge/Node.js-v16.14.2-green?logo=Node.js'/>
  <img src='https://img.shields.io/badge/Express-v4.17.3-black?logo=Express'/>
  <img src='https://img.shields.io/badge/MongoDB-v4.2.19-green?logo=mongodb'/>
  <img src='https://img.shields.io/badge/prettier-v2.5.1-pink?logo=prettier'/>
  <img src='https://img.shields.io/badge/Passport-v0.5.2-green?logo=passport'/>
  <img src='https://img.shields.io/badge/socket.io-v4.4.1-white?logo=Socket.io'/>
  <img src="https://img.shields.io/badge/Json Web Token-v8.5.1-8a8a8a?logo=JSON Web Tokens&logoColor=white" />
  </br></br>
  Deploy
  </br></br>
  <img src="https://img.shields.io/badge/Git hub-000000?logo=Github&logoColor=white" />
  
</p>

## 바로가기
- 사이트 바로가기 : https://seuchida.shop
- 발표 영상 : 

## 🎉 스치다 서비스 소개

### 시연 영상


### 1. 우리 동네 스포츠 친구찾기 서비스
<details> <summary>실시간 위치기반 서비스로 현재 내 위치를 기준으로 주변 운동친구들을 찾아주는 서비스입니다!</summary> <div markdown="1"> <img width='25%' src='https://practice2082.s3.ap-northeast-2.amazonaws.com/%EB%A6%AC%EB%93%9C%EB%AF%B8+%EC%9D%B4%EB%AF%B8%EC%A7%801.png'> </div> </details>


### 2. 혼자하기 힘든 운동들도 스치다를 통해 같이 운동할 수 있습니다!
<details> <summary>운동 종목과 운동할 장소, 시간을 정해서 같이 운동할 사람을 모집할 수 있습니다.</summary> <img width='25%' src='https://practice2082.s3.ap-northeast-2.amazonaws.com/%EB%A6%AC%EB%93%9C%EB%AF%B8+%EC%9D%B4%EB%AF%B8%EC%A7%802.png'> </details>


## 서비스 아키텍처   

![서비스 아키텍처 (2)](https://practice2082.s3.ap-northeast-2.amazonaws.com/%EC%95%84%ED%82%A4%ED%83%9D%EC%B3%90%EC%9D%B4%EB%AF%B8%EC%A7%80.png)

## 트러블 슈팅 & 기술적 도전



### 소셜 로그인
#### 구글 로그인 시 Auth URI의 구성을 어떻게 해야 하는지 파악이 안된 문제
=>	구글 CLIENT_ID 와 REDIRECT URI를 구글 클라우드 플랫폼에 등록하고 Userinfo의 스코프를 지정하여 Auth URI와 callback URI를 정하였습니다.
#### 배포 후 일반 유저가 구글 로그인을 할 수 있는지 파악이 안된 문제
=>	테스트유저 외의 일반유저도 로그인을 할 수 있게 앱 게시 허가를 받아야 했습니다. 컨택 메일을 주고 받으며 충족요건을 채우다 이렇게 하지 않아도 테스트 모드만으로도 일반 유저가 사용할 수 있게 된 것을 알게 되어 허가 없이 그대로 진행했습니다.

### 게시글 작성
#### 지도맵에 마커표시+지도검색 혼합기능 구현 문제
=>	지도에 직접 장소를 표시할 수 있는 기능과 검색을 통해 나오는 장소가 나오게 하는 기능을 동시에 구현하기에는 리액트용 패키지로는 한계가 있었습니다. 그리하여 현재위치 지도와 검색 후 보여주는 지도를 웹용으로 구현하고 검색 지도에도 직접 마커를 표시할 수 있게 구현하였습니다.

### CI/CD:
#### Git actions의 workflow시 cloudfront로 배포가 안되는 문제
=>	Git에 s3 자동 deploy를 설정하였으나 https로 배포해야 하기에 cloudfront로 설정을 하니 자동 deploy가 실현되지 않았습니다. 해결방법으로는 s3를 퍼블릭 설정을 해제하고 권한을 cloudfront로 넘겨주었고, 캐시가 남겨지는 문제는 정책에서 TTL을 1초로 주어 자동으로 지워지게 설정하여 해결하였습니다.


## 📌 팀원소개
### 프론트엔드
- 이태훈 : 
- 강형원 : 
- 최정원 : 
### 백엔드
- 신상렬 : 
- 윤영수 : 
- 김연유 :
### 디자이너
- 장유진
- 이수림 

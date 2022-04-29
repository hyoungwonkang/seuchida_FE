import React from 'react';
import styled from 'styled-components'
import FooterMenu from '../shared/FooterMenu';
import { KakaoMap } from '../components';
const Map = () => {


  return (
    <>
    <Header>
      <Title>내 주변에 개설된 <br/>운동매칭이에요</Title>
    
    </Header>
    <div style={{marginTop:"128px"}}>
<KakaoMap MainMap /></div>
<FooterMenu/>
    </>
  );
};

export default Map;

const Header = styled.div`
  z-index: 3;
  background-color: white;
  width: 100%;
  height: 100px;
  max-width: 420px;
  padding:  24px;
  position: fixed;
  top:0;
`;

const Title = styled.div`
color : #434343;
font-size: 28px;
font-weight: bold;
margin-top: 12px;
`


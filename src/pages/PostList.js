import React from "react";
import { Card } from "../components/index";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
const PostList = () => {
  return (
    <>
      <Header>
    <div> 뒤로 가기 버튼</div>
        <HeadContents>

    <div> 서울시 강남구</div>
    <div> 필터</div>
        </HeadContents>
      </Header>

      <ListBox>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ListBox>
      <FooterMenu/>
      
    </>
  );
};

export default PostList;

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e9e9e9; ;
  
`;
const HeadContents = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 24px  24px 0px 24px;
`;

const ListBox = styled.div`
  margin-top: 80px;
`;

import React from 'react';
import { Card } from '../components/index';
import styled from 'styled-components';
import FooterMenu from '../shared/FooterMenu';
import gBack from '../shared/ImgBox/gBack.png';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
const PostList = () => {
  const dispatch = useDispatch()
  const post_list = useSelector((state)=> state.post.list.nearPosts)
  console.log(post_list)
  React.useEffect(() =>{

    dispatch(postActions.getnearPostDB())
    // dispatch(userActions.getUser(state.state))
  },[])
  


  return (
    <>
      <Header>
        <Gback>
          <img src={gBack} />
        </Gback>
        <HeadContents>
          <div> 서울시 강남구</div>
        </HeadContents>
      </Header>

      <ListBox>
        <Card post_list={post_list}/>

      </ListBox>
      <FooterMenu />
    </>
  );
};

export default PostList;

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 24px 0px 0px 24px;
  border-bottom: 1px solid #e9e9e9; ;
`;

const Gback = styled.div``;
const HeadContents = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const ListBox = styled.div`
  margin-top: 120px;
`;

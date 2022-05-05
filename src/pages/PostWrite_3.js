import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../elements/Index';
import { useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import FooterMenu from '../shared/FooterMenu';
import DateTimePicker from 'react-datetime-picker';

const PostWrite_3 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getPostContents = useSelector((state) => state?.post?.post_contents);
  const getMap = useSelector((state) => state?.post?.post_map);

  const memberAge = getPostContents?.post_contents?.memberAge;
  const memberGender = getPostContents?.post_contents?.memberGender;
  const maxMember = getPostContents?.post_contents?.maxMember;
  const postCategory = getPostContents?.post_contents?.postCategory;
  const postTitle = getPostContents?.post_contents?.postTitle;
  const postDesc = getPostContents?.post_contents?.postDesc;

  const address = getMap?.post_map?.address;
  const spot = getMap?.post_map?.spot;
  const latitude = getMap?.post_map?.latitude;
  const longitude = getMap?.post_map?.longitude;

  //날짜
  const [datemate, setDatemate] = useState(new Date());

  const addPost = () => {
    dispatch(
      postActions.addPostDB(
        address,
        datemate,
        latitude,
        longitude,
        maxMember,
        memberAge,
        memberGender,
        postCategory,
        postDesc,
        postTitle,
        spot
      )
    );
  };

  console.log(address);
  console.log(datemate);
  console.log(latitude);
  console.log(longitude);
  console.log(maxMember);
  console.log(memberAge);
  console.log(memberGender);
  console.log(postCategory);
  console.log(postDesc);
  console.log(postTitle);
  console.log(spot);

  return (
    <>
      <Container>
        날짜 및 시간
        <div>
          <DateTimePicker onChange={setDatemate} value={datemate} />
        </div>
        장소
        <div>{spot}</div>
        <Button _onClick={addPost}>확인</Button>
        <FooterMenu next path='/postwrite4' text='다음' />
        {/* <FooterMenu next _onClick={addPost} text='확인' /> */}
      </Container>
    </>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

export default PostWrite_3;

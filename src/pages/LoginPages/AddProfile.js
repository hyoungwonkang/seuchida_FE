import React, { useState, useSelector } from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configStore';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { Grid, Button, Image, Text, Input } from '../../elements/Index';

const AddProfile = (props) => {
  // const fileInput = React.useRef();
  const address = props.location.state?.address;

  // const userInfo = useSelector((state) => state.user?.userInfo);

  const [preview, setPreview] = useState();
  const [profile, setProfile] = useState();
  // userInfo.useImg?  userInfo.userImg : ""
  const [nickName, setNickName] = useState();
  // userInfo.nickname?  userInfo.nickname : ""
  const [gender, setGender] = useState();
  // userInfo.userGender?  userInfo.userGender : ""
  const [age, setAge] = useState();
  // userInfo.userAge?  userInfo.userAge : ""
  const [content, setContent] = useState();
  // userInfo.userContent?  userInfo.userContent : ""

  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setProfile(e.target.files[0]);
  };

  const selectNickName = (e) => {
    setNickName(e.target.value);
  };
  const selectGender = (e) => {
    setGender(e.target.value);
  };
  const selectAge = (e) => {
    setAge(e.target.value);
  };
  const selectContent = (e) => {
    setContent(e.target.value);
  };

  // React.useEffect(() => {
  //   //Didupdate
  //   setNickName(userInfo.nickName);
  //   setGender(userInfo.userGender);
  //   setAge(userInfo.userAge);
  //   setContent(userInfo.userContent);
  // }, [userInfo]);

  return (
    <Grid>
      <Text size='20px' bold>
        프로필 작성하기
      </Text>
      <Grid padding='60px' column bg='green'>
        <Image
          size={80}
          alt='profile'
          src={preview ? preview : 'https://ifh.cc/g/SCJaxK.png'}
          // src={userInfo.userImg? userInfouserImg: preview ? preview : "https://ifh.cc/g/SCJaxK.png"}
        />
        <FileUpload>
          <label htmlFor='image'>+</label>
          <input
            type='file'
            id='image'
            onChange={(e) => {
              selectPreview(e);
              selectImage(e);
            }}
          />
        </FileUpload>
        <input
          type='text'
          placeholder='닉네임'
          onChange={selectNickName}
          // value={nickName || ""}
        />
        <Grid row padding='0px 60px'>
          <select onChange={selectGender} placeholder='성별'>
            <option value='남성'>남성</option>
            <option value='여성'>여성</option>
          </select>
          <div className='calendarBox'>
            <input
              type='text'
              placeholder='나이'
              onChange={selectAge}
              // value={age || ""}
            />
          </div>
        </Grid>

        <input
          type='text'
          placeholder='당신에 대해 조금 더 알려주세요!'
          onChange={selectContent}
          // value={content || ""}
        />
        <Link
          to={{
            pathname: '/category',
            state: { profile, nickName, gender, age, content, address },
          }}
        >
          <Button
            onClick={() => {
              history.push('/category');
            }}
          >
            다음
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

const FileUpload = styled.div`
  label {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    font-weight: normal;
    background: gray;
    color: white;
    cursor: pointer;
    border-radius: 50%;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

//   .Second {
//     width: 357px;
//     align-items: row;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .Second select {
//     width: 100px;
//   }
// `;

const Content = styled.input`
  width: 350px;
  height: 150px;
`;

export default AddProfile;

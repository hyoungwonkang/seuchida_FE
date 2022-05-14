import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, Image, Input, Text, GoBack } from '../../elements/Index';
import { actionCreators as userActions } from '../../redux/modules/user';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../../shared/FooterMenu';
import Modal from '../../components/Modal/Modal'; //모달 창
import ModalData from '../../components/Modal/ModalData';
import { AiFillPlusCircle } from 'react-icons/ai';

const AddProfile = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //유저 정보
  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  const userInfo = useSelector((state) => state.user?.userInfo);
  const edit = useSelector((state) => state.user?.userInfo.userImg);
  const is_edit = edit ? true : false;

  //수정 페이지 기본 정보 불러오기
  React.useEffect(() => {
    setProfile(userInfo?.userImg);
    setNickName(userInfo?.nickName);
    setGender(userInfo?.userGender);
    setAge(userInfo?.userAge);
    setContent(userInfo?.userContent);
  }, [userInfo]);

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  //입력값 state
  const [preview, setPreview] = useState('');
  const [profile, setProfile] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [content, setContent] = useState('');

  //프로필,닉네임,성별,나이,자기 소개 로컬에 값 저장
  window.localStorage.setItem('profile', JSON.stringify([profile]));
  localStorage.setItem('nickName', nickName);
  localStorage.setItem('gender', gender);
  localStorage.setItem('age', age);
  localStorage.setItem('content', content);

  //프로필 작성 페이지 localstorage 값 저장
  React.useEffect(() => {
    setNickName(localStorage.getItem('content'));
  }, [content]);

  //
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
    if (e.target.value.length >= 100) {
      e.target.value = e.target.value.substr(0, 100);
    }
    setContent(e.target.value);
  };

  //빈값 유효성 검사
  const alert = (e) => {
    if (!is_edit) {
      if (
        profile === undefined ||
        nickName === undefined ||
        gender === undefined ||
        age === undefined ||
        content === undefined
      ) {
        setIsOpen(true);
      } else {
        history.push('/category');
      }
    } else {
      if (
        profile === '' ||
        nickName === '' ||
        gender === '' ||
        age === '' ||
        content === ''
      ) {
        setIsOpen(true);
      } else {
        history.push('/category');
      }
    }
  };

  if (content?.length >= 100) {
    window.alert('100글자 이내로 작성해주세요:)');
  }

  return (
    <Grid>
      {is_edit ? (
        <GoBack text='프로필 수정' path='/signuploca' />
      ) : (
        <GoBack text='프로필 작성' path='/signuploca' />
      )}

      <Grid column height='650px'>
        <Grid height='auto' column margin='30px 0px'>
          {/* 프로필 이미지 */}
          <Image
            size={80}
            position='relative'
            alt='profile'
            src={
              preview
                ? preview
                : is_edit
                ? userInfo.userImg
                : 'https://ifh.cc/g/SCJaxK.png'
            }
          />
          <FileUpload>
            <label htmlFor='image'>
              <AiFillPlusCircle size={32} />
            </label>
            <input
              type='file'
              id='image'
              onChange={(e) => {
                selectPreview(e);
                selectImage(e);
              }}
            />
          </FileUpload>

          {/* 닉네임 */}
          <Input
            height='56px'
            type='text'
            placeholder='닉네임'
            _onChange={selectNickName}
            value={nickName || ''}
          />

          {/* 성별 */}
          <Option>
            <select onChange={selectGender} defaultValue='default'>
              <option className='title' value='default' disabled>
                {userInfo.userGender ? userInfo.userGender : '성별'}
              </option>
              <option value='남성'>남성</option>
              <option value='여성'>여성</option>
            </select>

            {/* 나이 */}
            <div className='calendarBox'>
              <Input
                wd
                height='56px'
                type='number'
                placeholder='나이'
                _onChange={selectAge}
                value={age || ''}
              />
            </div>
          </Option>

          {/* 자기소개 한 줄 */}
          <Input
            multiLine
            height='160px'
            margin='0px 0px 100px 100px'
            type='text'
            placeholder='당신에 대해 조금 더 알려주세요!'
            _onChange={selectContent}
            value={content || ''}
          />
          <Text size='16px' color='#787878' margin='0px 0px 0px 300px'>
            {content?.length}/100
          </Text>

          {/* 푸터 */}
          <FooterMenu
            next
            text='다음'
            state={alert}
            // event={setIsOpen(true)}
          />

          {/* 경고창 모달 */}
          <Modal open={isOpen}>
            <ModalData Alert onClose={() => setIsOpen(false)} />
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  );
};

const FileUpload = styled.div`
  margin: 0px 0px 50px 0px;
  label {
    position: absolute;
    top: 150px;
    right: 150px;
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
const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 342px;
  height: 56px;
  margin: 10px 0px;

  select {
    width: 122px;
    height: 56px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  .age {
    width: 213px;
    height: 56px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  .title[value='default'][disabled] {
    display: none;
  }
`;

export default AddProfile;

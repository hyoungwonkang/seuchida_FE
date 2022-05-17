import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import FooterMenu from '../shared/FooterMenu';
import { Grid, Text, GoBack } from '../elements/Index';
import Modal from '../components/Modal/Modal';
import ModalData from '../components/Modal/ModalData';

import { IconContext } from 'react-icons';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const PostWrite_2 = (props) => {
  document.body.style.overscrollBehavior = 'none';
  const history = useHistory();

  if (history.action === 'POP') {
    history.replace('/main');
  }

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  const postCategory = props.location.state?.postCategory;
  const postTitle = props.location.state?.postTitle;
  const postDesc = props.location.state?.postDesc;

  //인원
  let [maxMember, setMaxMember] = useState(2);
  maxMember = parseInt(maxMember);
  const onIncrease = () => {
    setMaxMember(maxMember + 1);
    if (maxMember > 29) {
      setMaxMember(maxMember);
      alert('제한인원은 30명까지 입니다.');
    }
  };

  const onDecrease = () => {
    setMaxMember(maxMember - 1);
    if (maxMember < 3) {
      setMaxMember(maxMember);
      alert('모집인원은 2명 이상 입니다.');
    }
  };

  //성별
  const [memberGender, setMemberGender] = useState('');

  //나이
  let [memberAge, setMemberAge] = useState('');

  //'직접입력' 시 나이를 조합합니다.
  const [member, setMember] = useState({
    fage: '',
    lage: '',
  });
  let combine_member = member.fage + '~' + member.lage + '세';

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  if (memberAge === '나이무관') {
    member.fage = '';
    member.lage = '';
  }

  // '직접입력' 시 조합된 나이로 보내줍니다.
  if (combine_member.length > 2) {
    memberAge = combine_member;
  }

  //토글
  const [show, setShow] = useState(false);
  let [showOptions, setShowOptions] = useState('');

  //프로그레스바
  let count = 1;
  if (maxMember > 1) {
    count++;
  }

  //유효성 검사
  const check = (e) => {
    if (memberGender === '' || memberAge === '') {
      setIsOpen(true);
    } else {
      history.push('/postwrite3');
    }
  };

  const chkCharCode = (e) => {
    const regExp = /[^0-9]/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, '');
    }
  };

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postcategory' />
      <Grid margin='24px 0px 40px 0px'>
        <ProgressBar>
          <HighLight width={(count / 3) * 100 + '%'} />
        </ProgressBar>
      </Grid>
      <LineBox>
        <Grid row margin='12px 0px' height='auto' justify='space-between'>
          <Grid row margin='0px 0px 0px 24px'>
            <IconContext.Provider value={{ color: '#787878', size: '16px' }}>
              <BsFillPeopleFill />
            </IconContext.Provider>
            <Text width='40px' margin='0px 12px' size='16px'>
              인원
            </Text>
          </Grid>
          <Grid row margin='0px 24px 0px 172px'>
            <div onClick={onDecrease}>
              <IconContext.Provider value={{ color: '#DDDDDD', size: '28px' }}>
                <AiOutlineMinusCircle />
              </IconContext.Provider>
            </div>
            <Grid margin='0px 0px 6px 0px'>
              {' '}
              &nbsp;{maxMember}&nbsp;명&nbsp;{' '}
            </Grid>
            <div onClick={onIncrease}>
              <IconContext.Provider value={{ color: '#DDDDDD', size: '28px' }}>
                <AiOutlinePlusCircle />
              </IconContext.Provider>
            </div>
          </Grid>
        </Grid>
      </LineBox>
      <Grid
        row
        margin='12px 0px 20px 24px'
        height='auto'
        padding='0px 52px 4px 0px'
        justify='space-between'
      >
        <IconContext.Provider value={{ color: '#787878', size: '24px' }}>
          <MdEdit />
        </IconContext.Provider>
        <Text width='100px' margin='0px 12px'>
          모집조건
        </Text>
        <Grid _onClick={() => setShow(!show)} isFlex_end>
          {show ? (
            <div
              onClick={() => setShowOptions(memberGender + `, ` + memberAge)}
              style={{ color: '#000000' }}
            >
              확인
            </div>
          ) : showOptions ? (
            memberGender + `, ` + memberAge
          ) : (
            <div style={{ color: '#C4C4C4' }}>조건 선택</div>
          )}
        </Grid>
      </Grid>
      <div className='App'>
        {show ? (
          <div>
            <GenderBox>
              <Text>성별</Text>
              <Grid margin='0px 0px 32px 0px'>
                <form
                  onChange={(e) => {
                    setMemberGender(e.target.value);
                  }}
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <Grid>
                    <RadioInput type='radio' name='state' value='성별무관' />{' '}
                    성별무관&nbsp;&nbsp;&nbsp;&nbsp;
                    <RadioInput type='radio' name='state' value='여성만' />{' '}
                    여성만&nbsp;&nbsp;&nbsp;&nbsp;
                    <RadioInput type='radio' name='state' value='남성만' />{' '}
                    남성만
                  </Grid>
                </form>
              </Grid>
            </GenderBox>
            <AgeBox>
              <Text>나이</Text>
              <form
                onChange={(e) => {
                  setMemberAge(e.target.value);
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Grid>
                  <Grid>
                    <RadioInput type='radio' name='state' value='나이무관' />{' '}
                    나이무관&nbsp;&nbsp;&nbsp;&nbsp;
                    <RadioInput
                      type='radio'
                      name='state'
                      value={member.fage + member.lage}
                    />{' '}
                    직접입력
                  </Grid>
                  <Grid row margin='28px 0px' padding='4px 8px'>
                    <label>
                      <AgeInput
                        type='number'
                        name='fage'
                        value={member.fage}
                        onChange={handleChange}
                        placeholder='시작 나이 ex) 20'
                        style={{
                          width: '136px',
                          height: '56px',
                          textAlign: 'center',
                          fontSize: '16px',
                        }}
                        pattern='[0-9]+'
                        // onKeyUp={chkCharCode}
                      />
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <Text size='18px' bold>
                      -
                    </Text>
                    &nbsp;&nbsp;&nbsp;
                    <label>
                      <AgeInput
                        type='number'
                        name='lage'
                        value={member.lage}
                        onChange={handleChange}
                        placeholder='끝 나이 ex) 29'
                        style={{
                          width: '136px',
                          height: '56px',
                          textAlign: 'center',
                          fontSize: '16px',
                        }}
                        pattern='[0-9]+'
                        // onKeyUp={chkCharCode}
                      />
                    </label>
                  </Grid>
                </Grid>
              </form>
            </AgeBox>
          </div>
        ) : null}
      </div>
      <Link
        to={{
          state: {
            maxMember,
            memberGender,
            memberAge,
            postCategory,
            postTitle,
            postDesc,
          },
        }}
      >
        <FooterMenu next text='다음' state={check} />
      </Link>
      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData Alert onClose={() => setIsOpen(false)} />
      </Modal>
    </Grid>
  );
};

const LineBox = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

const GenderBox = styled.div`
  margin: 20px 0px;
  padding: 0px 24px;
`;

const AgeBox = styled.div`
  margin: 20px 0px;
  padding: 0px 24px;
`;

const ProgressBar = styled.div`
  background: #eee;
  width: 85%;
  height: 4.5px;
  margin-left: 28px;
  margin-bottom: 28px;
`;

const HighLight = styled.div`
  background: #0ed88b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

const AgeInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 20px;
  height: 20px;

  border: 2px solid #999;
  transition: 0.2s all linear;
  margin-right: 5px;

  position: relative;
  top: 4px;

  :checked {
    border: 5px solid #5796f7;
  }
`;
export default PostWrite_2;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FooterMenu from '../shared/FooterMenu';
import { Button, Grid, Text, Input } from '../elements/Index';
import GoBack from '../components/GoBack';

import { BsFillPeopleFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const PostWrite_2 = (props) => {
  const history = useHistory();
  const postCategory = props.location.state?.postCategory;
  const postTitle = props.location.state?.postTitle;
  const postDesc = props.location.state?.postDesc;

  //인원
  const [maxMember, setMaxMember] = useState(0);

  const onIncrease = () => {
    setMaxMember(maxMember + 1);
    if (maxMember > 29) {
      setMaxMember(maxMember);
      alert('제한인원은 30명까지 입니다.');
    }
  };

  const onDecrease = () => {
    setMaxMember(maxMember - 1);
    if (maxMember < 1) {
      setMaxMember(maxMember);
      alert('잘못된 입력입니다.');
    }
  };

  //성별
  const [memberGender, setMemberGender] = useState('누구나');
  const genderChange = (e) => {
    setMemberGender(e.target.value);
  };

  //나이
  let [memberAge, setMemberAge] = useState('누구나');
  // const ageChange = (e) => {
  //   setMemberAge(e.target.value);
  // };

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

  // '직접입력' 시 조합된 나이로 보내줍니다.
  if (combine_member.length > 2) {
    memberAge = combine_member;
  }

  //토글
  const [show, setShow] = useState(false);

  //프로그레스바
  let count = 1;
  if (maxMember > 0) {
    count++;
  }

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postwrite1' />
      <ProgressBar>
        <HighLight width={(count / 3) * 100 + '%'} />
      </ProgressBar>
      <LineBox>
        <Grid row margin='12px 0px' height='auto' justify='space-between'>
          <Grid row margin='0px 0px 0px 24px'>
            <BsFillPeopleFill />
            <Text margin='0px 12px' size='16px'>
              인원
            </Text>
          </Grid>
          <Grid row margin='0px 24px 0px 124px'>
            <div onClick={onDecrease}>
              <AiOutlineMinusCircle size='31' />
            </div>
            <Grid padding='0px 12px'> {maxMember}명 </Grid>
            <div onClick={onIncrease}>
              <AiOutlinePlusCircle size='31' />
            </div>
          </Grid>
        </Grid>
      </LineBox>
      <Grid row margin='12px 0px 20px 24px'>
        <MdEdit />
        <Text margin='0px 12px' size='16px' _onClick={() => setShow(!show)}>
          모집조건
        </Text>
      </Grid>
      <div className='App'>
        {show ? (
          <div>
            <GenderBox>
              <Text>성별</Text>
              <Grid row>
                <Item>
                  <RadioButton
                    type='radio'
                    name='gender'
                    value='누구나'
                    checked={memberGender === '누구나'}
                    onChange={(event) => genderChange(event)}
                  />
                  <RadioButtonLabel />
                  <div>누구나</div>
                </Item>
                <Item>
                  <RadioButton
                    type='radio'
                    name='gender'
                    value='여성만'
                    checked={memberGender === '여성만'}
                    onChange={(event) => genderChange(event)}
                  />
                  <RadioButtonLabel />
                  <div>여성만</div>
                </Item>
                <Item>
                  <RadioButton
                    type='radio'
                    name='gender'
                    value='남성만'
                    checked={memberGender === '남성만'}
                    onChange={(event) => genderChange(event)}
                  />
                  <RadioButtonLabel />
                  <div>남성만</div>
                </Item>
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
                    <input type='radio' name='state' value='누구나' /> 누구나
                    <input
                      type='radio'
                      name='state'
                      value={member.fage + member.lage}
                    />
                    직접입력
                  </Grid>
                  <Grid margin='12px 0px' justify='center'>
                    <label>
                      <input
                        type='textarea'
                        name='fage'
                        value={member.fage}
                        onChange={handleChange}
                        placeholder='시작 나이 ex) 20'
                        style={{ width: '100px', height: '32px' }}
                      />
                    </label>
                    {'   -   '}
                    <label>
                      <input
                        type='textarea'
                        name='lage'
                        value={member.lage}
                        onChange={handleChange}
                        placeholder='끝 나이 ex) 29'
                        style={{ width: '100px', height: '32px' }}
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
          pathname: '/postwrite3',
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
        {/* <FooterMenu
          next
          path='/postwrite3'
          text='다음'
          onClick={addContents}
          event={maxMember < 2 ? alert('인원을 2명 이상 설정해 주세요') : ''}
        /> */}
        <Button margin='260px 0px 0px 24px'>다음</Button>
      </Link>
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

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  margin: 0px 20px 0px 0px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 20%;
  background: white;
  border: 1px solid #bebebe;
  /* ${(props) =>
    props.checked?.length > 2 ? `background:#C9C9C9'` : `background:'white'`} */
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #C9C9C9;
      &::after {
        content: "";
        display: block;
        margin: 6px;
        background: white;
      }
    }
  `}
`;

const ProgressBar = styled.div`
  background: #eee;
  width: 85%;
  height: 4.5px;
  margin-left: 28px;
  margin-bottom: 28px;
`;

const HighLight = styled.div`
  background: black;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_2;

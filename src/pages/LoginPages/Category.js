import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
import { Button } from '../../elements/Index';

const Category = (props) => {
  const get = props.location.state;
  console.log(get);
  const nickName = get?.nickName;
  const gender = get?.gender;
  const age = get?.age;
  const content = get?.content;
  const address = get?.address;
  const profile = get?.profile;

  const CategoryList = [
    { id: 0, data: '자전거' },
    { id: 1, data: '배드민턴' },
    { id: 2, data: '골프' },
    { id: 3, data: '볼링' },
    { id: 4, data: '테니스/스쿼시' },
    { id: 5, data: '탁구' },
    { id: 6, data: '스키/보드' },
    { id: 7, data: '헬스/크로스핏' },
    { id: 8, data: '요가/필라테스' },
    { id: 9, data: '당구/포켓볼' },
    { id: 10, data: '러닝/걷기' },
    { id: 11, data: '축구/풋살' },
    { id: 12, data: '농구' },
    { id: 13, data: '야구' },
    { id: 14, data: '배구' },
    { id: 15, data: '족구' },
    { id: 16, data: '태권도' },
    { id: 17, data: '검도' },
    { id: 18, data: '클라이밍' },
    { id: 19, data: '수영/스쿠버다이빙' },
    { id: 20, data: '서핑/웨이크보드/요트' },
    { id: 21, data: '크루즈보드' },
    { id: 22, data: '스케이트/인라인' },
    { id: 23, data: '기타' },
  ];

  const dispatch = useDispatch();
  // 데이터를 넣을 빈배열

  // const getUserInterest = useSelector((state) => state.user?.userInfo.userInterest);
  // const userInfo = { nickName, gender, age, content, address, profile };
  const [userInterest, setUserInterest] = useState([]);
  // getUserInterest?  getUserInterest : ""
  // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기

  const _userInterest = (checked, item) => {
    if (checked) {
      if (userInterest.length <= 2) {
        setUserInterest([...userInterest, item]);
      } else {
        window.alert('최대 3개까지 선택 가능합니다:)');
      }
    } else if (!checked) {
      setUserInterest(userInterest.filter((el) => el !== item));
    }
  };

  const addProfile = () => {
    // if (!fileInput.current || fileInput.current.files.length === 0) {
    //   window.alert("이미지파일을 등록해주세요!");
    //   return;
    // }
    // const file = fileInput.current.files[0];

    const formData = new FormData();
    formData.append('userImg', profile);
    formData.append('nickName', nickName);
    formData.append('userGender', gender);
    formData.append('userAge', age);
    formData.append('userContent', content);
    formData.append('address', address);
    formData.append('userInterest', userInterest);
    console.log('formData', formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    dispatch(userActions.signupDB(formData));
  };

  // const addProfile = () => {
  //   dispatch(userActions.signupDB(userInfo, userInterest));
  //   // history.push("/main");
  // };

  // const editUser = () => {
  //   dispatch(userActions.editUserDB(formData));
  // };

  return (
    <div>
      <h3>상세 관심사 선택</h3>
      <CateBox>
        {CategoryList.map((item) => {
          // console.log(item);
          return (
            <div key={item.id}>
              <input
                id={item.id}
                type='checkbox'
                value={item.data}
                // value={getUserInterest? getUserInterest : item.data}
                onChange={(e) => {
                  _userInterest(e.target.checked, e.target.value);
                }}
                //배열에 data가 있으면 true, 없으면 false
                checked={userInterest.includes(item.data) ? true : false}
              />
              <label htmlFor={item.id}>
                <Cate color={+userInterest.includes(item.data)}>
                  {item.data}
                </Cate>
              </label>
            </div>
          );
        })}
        <Button _onClick={addProfile}>다음</Button>
      </CateBox>
    </div> //+; 스트링으로 변환
  );
};

const CateBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  label {
    display: inline-block;
  }
  input {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`;
const Cate = styled.div`
  width: auto;
  height: 30px;
  margin: 5px;
  padding: 5px 12px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 20px;
  background: ${(props) => (props.color ? 'lightgreen' : 'white')};
`;

export default Category;

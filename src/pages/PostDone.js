import React from 'react';
import Button from '../elements/Button';
import { Grid, Text } from '../elements/Index';

const PostDone = () => {
  //localStorage에 있는 데이터를 삭제합니다.
  const setDone = () => {
    localStorage.removeItem('address');
    localStorage.removeItem('spot');
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    localStorage.removeItem('datemate');
    localStorage.removeItem('memberAge');
    localStorage.removeItem('memberGender');
    localStorage.removeItem('maxMember');
    localStorage.removeItem('postCategory');
    localStorage.removeItem('postTitle');
    localStorage.removeItem('postDesc');
    localStorage.removeItem('searchPlace');
    localStorage.removeItem('value');
    localStorage.removeItem('pageTime');
    localStorage.removeItem('dayDate');
    localStorage.removeItem('inputText');
    localStorage.removeItem('showOptions');
    localStorage.removeItem('dayDate');
    localStorage.removeItem('dayDate');
    window.location.href = '/main';
  };
  return (
    <Grid>
      <Text margin='280px 0px 10px 44px' size='24px'>
        모집 등록이 완료되었습니다!
      </Text>
      <Text margin='0px 0px 0px 80px' size='16px' color='grey'>
        내가 만든 모임은 마이페이지에서
      </Text>
      <Text margin='0px 0px 40px 132px' size='16px' color='grey'>
        확인할 수 있어요
      </Text>
      <Button margin='0px 0px 0px 24px' _onClick={setDone} text='확인' />
    </Grid>
  );
};

export default PostDone;

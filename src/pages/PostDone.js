import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { Grid, Text } from '../elements/Index';
import FooterMenu from '../shared/FooterMenu';

const PostDone = () => {
  const history = useHistory();
  return (
    <Grid>
      <Text margin='280px 0px 10px 44px' size='24px'>
        모집 등록이 완료되었습니다!
      </Text>
      <Text margin='0px 0px 0px 80px' size='16px'>
        내가 만든 모임은 마이페이지에서
      </Text>
      <Text margin='0px 0px 40px 132px' size='16px'>
        확인할 수 있어요
      </Text>
      <FooterMenu next path='/main' text='확인' />
    </Grid>
  );
};

export default PostDone;

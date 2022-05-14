import React from 'react';
import { Grid, Text } from '../../elements/Index';
import FooterMenu from '../../shared/FooterMenu';
import { useHistory } from 'react-router-dom';

const EditDone = () => {
  const history = useHistory();

  const removeToken = () => {
    localStorage.removeItem('address');
    localStorage.removeItem('profile');
    localStorage.removeItem('nickName');
    localStorage.removeItem('gender');
    localStorage.removeItem('age');
    localStorage.removeItem('content');
    localStorage.removeItem('userInterest');
    history.push('/main');
  };
  return (
    <Grid column margin='200px 0px'>
      <Text size='24px'>
        프로필 수정이 <br />
        완료되었어요:)
      </Text>
      <FooterMenu next event={removeToken} text='다음' />
    </Grid>
  );
};

export default EditDone;

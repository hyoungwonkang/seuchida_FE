import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { history } from '../redux/configStore';
import { Grid, Text } from './Index';

const GoBack = (props) => {

  if(props.Gback){

   return (
      <>
      <IoIosArrowBack
        gback
        size={32}
        onClick={
          props._onClick
        }
      /></>
   )   
  }
  
  return (

   <>
    <Grid row padding='20px'>
      <IoIosArrowBack
        size={32}
        onClick={() => {
          history.push(props.path);
        }}
      />
      <Text size='20px' position margin='0px 0px 0px 40px'>
        {props.text}
      </Text>
    </Grid>
</>

  );
};

export default GoBack;

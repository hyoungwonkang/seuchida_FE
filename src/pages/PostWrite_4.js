import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../elements/Index';

const PostWrite_4 = (props) => {
  const state = props.location.state;
  console.log(state);
  return <div>dd</div>;
};

export default PostWrite_4;

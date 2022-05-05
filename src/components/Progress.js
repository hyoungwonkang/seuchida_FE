import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../elements/Index";

const Progress = () => {
  // const bucket_list = useSelector((state) => state.bucket.list)
  // // console.log(bucket_list);

  // let count = 0;
  // bucket_list.map((b,i) => {
  //     if(b.completed){
  //         count ++;
  //     }
  // })

  // console.log(count)

  // width={(count/bucket_list.length)*100 + '%'}

  return (
    <Grid bg="gray" height="40px" width="342px" margin="auto">
      <Highlight width={"100px"} />
    </Grid>
  );
};

const Highlight = styled.div`
  background: yellow;
  transition: 1s width; //몇초동안 뭐를(생략하면 모든것을 바꿈)
  width: ${(props) => props.width};
  height: 40px;
`;

export default Progress;

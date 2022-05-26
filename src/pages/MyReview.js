import React, { useEffect } from "react";
import styled from "styled-components";
import ReviewCardD from "../components/ReviewCardD";
import FooterMenu from "../shared/FooterMenu";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import GoBack from "../elements/GoBack";
import { Grid } from "../elements/Index";

const MyReview = () => {
  const dispatch = useDispatch();
  const myReviewList = useSelector((state) => state.mypage.myReview);
  // console.log(myReviewList);

  useEffect(() => {
    dispatch(mypageActions.myReviewDB());
  }, []);

  if (!myReviewList) return;

  return (
    <>
      <Container>
        <Grid bg="white">
          <GoBack text="내가 쓴 후기" path="/mypage" />
          <Grid padding="0px 0px 80px 0px">
            {myReviewList.map((p, i) => {
              return <ReviewCardD {...p} key={p.id} />;
            })}
          </Grid>
          <FooterMenu />
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 0px;
`;

export default MyReview;

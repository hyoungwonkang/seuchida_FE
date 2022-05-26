import React, { useState } from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Modal from "../components/Modal/Modal"; //모달 창
import FooterMenu from "../shared/FooterMenu";
import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import { BiDumbbell } from "react-icons/bi";
import { MdPlace } from "react-icons/md";
import GoBack from "../elements/GoBack";
import { Grid } from "../elements/Index";
import ReviewCardD from "../components/ReviewCardD";
import axios from "axios";

const ReviewList = () => {
  const review = useSelector((state) => state.post.review);
  console.log();
  const dispatch = useDispatch();
  const params = useParams();
  const [postList, setPostList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageEnd = React.useRef(null);

  const review_list = [
    ...postList.filter((d) => d._id === params.reviewId),
    ...postList.filter((d) => d._id !== params.reviewId),
  ]; //선택된 리뷰를 가장 먼저 보여지도록 정렬을 수정

  const [modalOn, setModalOn] = React.useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    setModalOn(true);
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/reviewAll/${pageNumber}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setPostList((items) => [...items, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber]);

  //무한 스크롤(entries: 관찰 대상의 리스트)
  const onIntersect = (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        setPageNumber((prev) => prev + 1);
      }
    });
  };

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(pageEnd.current);
    return () => observer.disconnect();
  }, [pageEnd]);

  if (!review_list) return;

  return (
    <>
      <Header>
        <GoBack text={"함께한 스친들의 후기"} path="/main"></GoBack>
      </Header>
      <div style={{ margin: "0px 0px 80px 0px" }}>
        {review_list?.map((review, index) => {
          return (
            <div key={review._id}>
              {modalOn && <Modal />}

              <ProfileBox>
                <Image
                  margin="5px 15px 0px 0px"
                  shape="circle"
                  src={review.userImg}
                  size={36}
                  _onClick={openModal}
                />

                <User>
                  <Master>
                    {review.nickName === "undefined"
                      ? "탈퇴한 회원"
                      : review.nickName}
                  </Master>
                  <div style={{ color: "rgba(120, 120, 120, 1)" }}>
                    {review.createdAt}
                  </div>
                </User>
              </ProfileBox>
              {review.reviewImg ? (
                <Image shape="rectangle" size={390} src={review.reviewImg} />
              ) : null}
              <Desc>{review.content} </Desc>
              <Info>
                <div>
                  <MdPlace color="#787878" />
                  <span style={{marginLeft:"8px"}}>{review.spot}</span>
                </div>
                <div>
                  <BiDumbbell color="#787878" />
                  <span style={{marginLeft:"8px"}}>{review.postCategory}</span>
                </div>
              </Info>
            </div>
          );
        })}
        <div ref={pageEnd} className="pageEnd">
          {isLoading ? (
            <Pos>
              <Seuchin alt="loading" src="./img/loading.gif" width={130} />
            </Pos>
          ) : (
            ""
          )}
        </div>
      </div>
      <FooterMenu />
    </>
  );
};

export default ReviewList;

const Header = styled.div`
  padding: 8px 0px;
`;

const ProfileBox = styled.div`
  padding: 24px 24px 10px 24px;
  display: flex;
  flex-direction: row;
`;

const Master = styled.div`
  font-weight: bold;
`;
const Desc = styled.div`
  max-width: 390px;
  min-height: 60px;
  padding: 12px 24px;
`;

const Icon = styled.span`
  margin-right: 8px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px 24px 24px;
  border-bottom: 1px solid rgba(227, 227, 227, 1);
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Pos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Seuchin = styled.img`
  width: 100px;
`;

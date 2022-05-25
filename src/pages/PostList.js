import React, { useState } from "react";
import { Card } from "../components/index";
import { Button } from "../elements/Index";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import GoBack from "../elements/GoBack";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { useHistory } from "react-router-dom";
import { IoMdTennisball } from "react-icons/io";
import axios from "axios";

const PostList = ({ list, params }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // 포스트 목록
  const post_list = useSelector((state) => state.post.list.nearPosts);

  // const division = (arr, n) => {
  //   const length = arr.length;
  //   const divide =
  //     Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
  //   const newArray = [];

  //   for (let i = 0; i <= divide; i++) {
  //     // 배열 0부터 n개씩 잘라 새 배열에 넣기
  //     newArray.push(arr.splice(0, n));
  //   }

  //   return newArray;
  // };
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const result = division(arr, 3);
  // console.log(result);

  const [postList, setPostList] = useState([]);
  console.log(postList);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(pageNumber);
  const [isLoading, setIsLoading] = useState(true);
  const pageEnd = React.useRef(null);

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    // dispatch(postActions.getPostlistDB());
    // setIsLoading(false);
  }, []);
  const limit = 6;

  const test = () => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/nearPostList/${pageNumber}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data.nearPosts);
        setIsLoading(false);
        setPostList((items) => [...items, ...res.data.nearPosts]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    test(pageNumber);
  }, [pageNumber]);

  //무한 스크롤
  const onIntersect = (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        setPageNumber((prev) => prev + 1);
      }
    });
  };

  //바닥 감지
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

  return (
    <>
      <Header>
        <Gback>
          <GoBack
            gback
            _onClick={() => {
              window.location.href = "/main";
            }}
          />
        </Gback>
        <HeadContents>
          <div> 여기여기 붙어라</div>
        </HeadContents>
      </Header>

      <ListBox>
        {postList?.map((p, i) => {
          // console.log(p);
          return (
            <Card
              {...p}
              key={p.id}
              center={state.center}
              _onClick={() => {
                history.push(`/postdetail/${p._id}`);
              }}
            />
          );
        })}
        <div ref={pageEnd} className="pageEnd">
          {isLoading && (
            <img alt="loading" src="./img/loading.gif" width={130} />
          )}
        </div>
      </ListBox>

      <FooterMenu />
    </>
  );
};

export default PostList;

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 40px;
  padding: 24px 0px 0px 24px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  flex-direction: row;
`;

const Gback = styled.div``;
const HeadContents = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 2px 0px 0px 20px;
`;

const ListBox = styled.div`
  margin: 64px 0px 80px 0px;
`;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Image, Input, Text, GoBack } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import axios from "axios";

const Evaluation = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypageActions.myPostOneDB(postId));
  }, []);

  //ReviewWrite로 보낼zzz
  const postInfo = useSelector((state) => state.mypage.myPostOne);
  const postId = postInfo?.postId;
  const image = useSelector((state) => state.mypage.reviewImg);
  const review = localStorage.getItem("review");
  const reviewImg = localStorage.getItem("image");

  //내 아이디 가져오기
  useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  //내 id
  const myId = useSelector((state) => state.user.userInfo.userId);
  //평가할 사람들 목록(나 제외)
  const _postInfo = postInfo.nowMember.filter((v) => v !== myId);
  //다른 사람 id
  const otherId = postInfo?.nowMember?.map((v, i) => v.memberId);

  //좋아요||싫어요
  // const [checked, setChecked] = useState(false);
  const [evalue, setEvalue] = useState([]);
  console.log(evalue);
  // console.log(checked);

  const is_checked = () => {
    // 1. checkbox element를 찾습니다.
    const checkbox = document.getElementById("my_checkbox");
    // 2. checked 속성을 체크합니다.
    const is_checked = checkbox.checked;
    // 3. 결과를 출력합니다.
    // console.log(is_checked);
  };

  //좋아요||싫어요 배열화
  // const _userInterest = (checked, h) => {
  //   if (checked) {
  //     if (evalue?.length < 3) {
  //       setEvalue([...evalue, h]);
  //     } else {
  //       window.alert("최대 3개까지 선택 가능합니다:)");
  //       setEvalue([...evalue, h]);
  //     }
  //   } else if (!checked) {
  //     setEvalue(evalue?.filter((el) => el !== h));
  //   }
  // };

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalData, setModalData] = useState(null);

  //신고 대상 & 신고 내용 state
  const [report, setReport] = useState("");
  const [rUserId, setRUserId] = useState("");
  const [reportdone, setReportDone] = useState("");
  // console.log(report, rUserId);

  //로컬 값 저장
  localStorage.setItem("image", image);
  localStorage.setItem("otherId", JSON.stringify(otherId));
  localStorage.setItem("evalue", JSON.stringify(evalue));

  //후기 작성 & 다른 사람 평가
  const addReview = () => {
    //로컬 제거
    localStorage.removeItem("review");
    localStorage.removeItem("image");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
    dispatch(
      mypageActions.addReviewDB(review, reviewImg, otherId, evalue, postId)
    );
    history.push("/mypage");
  };

  //신고하기
  const addReport = () => {
    axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/report`,
      data: JSON.stringify({
        userId: rUserId,
        content: report,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        setReportDone(res);
        console.log("addReport에 성공했습니다.", res);
      })
      .catch((err) => {
        console.log("addReport에 실패했습니다.", err);
      });
  };

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.removeItem("review");
    // localStorage.removeItem("nickName");
    // localStorage.removeItem("gender");
    // localStorage.removeItem("age");
    // localStorage.removeItem("content");
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    history.replace(`reviewwrite/${postId}`);
  }

  if (!postInfo) return;

  return (
    <Grid>
      <GoBack text="후기 작성하기" path={`reviewwrite/${postId}`} />
      <Grid height="950px">
        <Text margin="0px 0px 0px 30px" size="24px" bold>
          함께한 분들은 어땠나요?
        </Text>
        <Text margin="12px 0px 20px 30px" size="16px" color="gray">
          평가를 완료해주시면 <br />
          더블 포인트를 받을 수 있어요
        </Text>

        {/* 다른 사람 평가 */}
        <Grid width="342px" margin="auto" height="300px">
          {postInfo?.nowMember.map((m, i) => {
            return (
              <div key={m._id}>
                <Grid row>
                  <Grid row margin="0px 0px 50px 0px">
                    <Image
                      shape="circle"
                      src={m.memberImg}
                      size={40}
                      margin="3px"
                      _onClick={() => {}}
                    />
                    <Text size="16px" bold>
                      {m.memberNickname}
                    </Text>
                  </Grid>

                  <Grid column>
                    <SelectBox>
                      <Grid margin="0px 0px 32px 0px" row>
                        {/* 좋아요 */}
                        <input
                          id={m._id}
                          type="radio"
                          name={i}
                          value={1}
                          onChange={(e) => {
                            setEvalue([...evalue, e.target.value]);
                          }}
                        />
                        <label>
                          <Select>좋아요</Select>
                        </label>

                        {/* 싫어요 */}
                        <input
                          id={m._id}
                          type="radio"
                          name={i}
                          value={-1}
                          onChange={(e) => {
                            setEvalue([...evalue, e.target.value]);
                          }}
                        />
                        <label>
                          <Select>싫어요</Select>
                        </label>
                      </Grid>
                    </SelectBox>

                    {/* 신고하기 */}
                    <Report
                      onClick={() => {
                        setIsOpen2(true);
                        setModalData(m);
                      }}
                      report={reportdone}
                    >
                      {reportdone ? "신고 완료" : "신고 하기"}
                    </Report>
                  </Grid>
                </Grid>
                {/* 신고창 모달 */}
                <Modal open={isOpen2}>
                  <ModalData
                    Evaluate
                    _report={report}
                    report={setReport}
                    onCheck={() => addReport()}
                    rUserId={setRUserId}
                    post={modalData}
                    onClose={() => setIsOpen2(false)}
                  />
                </Modal>
              </div>
            );
          })}
        </Grid>
      </Grid>

      {/* 푸터 */}
      <FooterMenu next text="후기 작성하기" event={addReview} />

      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData Alert onClose={() => setIsOpen(false)} />
      </Modal>
    </Grid>
  );
};

export default Evaluation;
const SelectBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* label {
    display: inline-block;
  }
  input {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0); */
  /* } */
`;

//카테고리 한 개 css
const Select = styled.div`
  width: 50px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px 2px 10px 2px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background: ${(props) => (props.color ? "#0ED88B" : "white")};
  color: ${(props) => (props.color ? "white" : "black")};
`;

//신고하기 버튼
const Report = styled.div`
  width: 216px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: ${(props) => (props.report ? "#3477F6" : "white")};
  color: ${(props) => (props.report ? "white" : "black")};
`;
const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 20px;
  height: 20px;

  border: 2px solid #999;
  margin-right: 5px;

  position: relative;
  top: 4px;

  :checked {
    border: 5px solid #5796f7;
  }
`;

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
  //4. input 값 배열로 한개씩만 들어가게끔..
  //5. 라디오 감추고 색으로 선택 + 디자인 수정
  //6. 유효성 검사 다 평가하게끔
  //7. 신고하기 선택하면 취소/삭제로 바꾸기 ok
  //8. 사람 클릭시 프로필 모달 띄우기
  const history = useHistory();
  const dispatch = useDispatch();

  //ReviewWrite에서 받아온 값
  const postInfo = props?.location?.state?.postInfo;
  const postId = props?.location?.state?.postInfo?.postId;
  const review = props?.location?.state?.review;
  const reviewImg = props?.location?.state?.reviewImg;

  //내 아이디 가져오기
  useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  //내 id
  const myId = useSelector((state) => state.user.userInfo.userId);
  //평가할 사람들 목록(나 제외)
  // const _postInfo = postInfo.nowMember.filter((v) => v.memberId !== myId);
  //다른 사람 id
  const otherId = postInfo?.nowMember?.map((v, i) => v.memberId);

  //좋아요||싫어요
  // const evalueList = new Array(postInfo.nowMember.length);
  // console.log(evalueList);
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [evalue, setEvalue] = useState([]);
  console.log(good);
  console.log(bad);
  console.log(evalue);
  // const [evalueList, setEvalueList] = useState([]);
  // let a = new Array(postInfo.nowMember.length);
  // const b = a.fill(evalue, 1, 2);

  const rate = [
    { id: 0, data: "좋아요 +1", value: "1" },
    { id: 1, data: "싫어요 -1", value: "-1" },
  ];

  //좋아요||싫어요 배열화
  const _userInterest = (checked, h) => {
    if (checked) {
      if (evalue?.length < 3) {
        setEvalue([...evalue, h]);
      } else {
        window.alert("최대 3개까지 선택 가능합니다:)");
        setEvalue([...evalue, h]);
      }
    } else if (!checked) {
      setEvalue(evalue?.filter((el) => el !== h));
    }
  };

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalData, setModalData] = useState(null);

  //신고 대상 & 신고 내용 state
  const [report, setReport] = useState("");
  const [rUserId, setRUserId] = useState("");
  const [reportdone, setReportDone] = useState("");

  //후기 작성 & 다른 사람 평가
  const addReview = () => {
    const formData = new FormData();
    formData.append("image", reviewImg);
    formData.append("content", review);
    for (var i = 0; i < otherId.length; i++) {
      formData.append("otherId[]", otherId[i]);
    }
    for (var i = 0; i < evalue.length; i++) {
      formData.append("evalues[]", evalue[i]);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(postId);
    dispatch(mypageActions.addReviewDB(formData, postId));
    // history.push("/mypage");
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

  if (!postInfo) return;

  return (
    <Grid>
      <GoBack text="후기 작성하기" path="/mypage" />
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
                      {/* 좋아요 */}
                      {rate.map((h, j) => {
                        return (
                          <>
                            <input
                              id={h.id}
                              type="checkbox"
                              name={i}
                              value={h.value}
                              onChange={(e) => {
                                //배열안에서 그 위치에 값만 바뀌고
                                //다음 클릭 시 계속 추가되는
                                // setGood(e.target.value);
                                setEvalue([...evalue, e.target.value]);
                                //api
                                // _userInterest(e.target.checked, e.target.value);
                              }}
                              checked={evalue.includes(h.data) ? true : false}
                            />
                            <label>
                              <Select>{h.data}</Select>
                            </label>
                          </>
                        );
                      })}

                      {/* 싫어요
                      <input
                        id={i}
                        type="radio"
                        name={i}
                        value="시러요"
                        onChange={(e) => {
                          setBad(e.target.value);
                          setEvalue([...evalue, bad]);
                        }}
                      />
                      <label>
                        <Select>싫어요</Select>
                      </label> */}
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
                    addreport={() => addReport()}
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

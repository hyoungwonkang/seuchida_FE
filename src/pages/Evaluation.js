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

const Evaluation = (props) => {
  console.log(props);
  //1. 나를 제외한 다른 사람만 평가하게끔 ok
  //2. input이 두개중 한개만 되도록 ok
  //3. 신고하기 userId와 값 일치시키기 ok
  //4. input 값 배열로 한개씩만 들어가게끔..
  //5. 라디오 감추고 색으로 선택 + 디자인 수정
  //6. 유효성 검사
  //7. 신고하기 선택하면 버튼 신고완료로 바꾸기
  const history = useHistory();
  const dispatch = useDispatch();

  //ReviewWrite에서 받아온 값
  const postInfo = props.location.state.postInfo;
  const postId = props.location.state.postInfo.postId;
  console.log(postId);
  const review = props.location.state.review;
  const reviewImg = props.location.state.reviewImg;

  //내 아이디 가져오기
  useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  //내 id
  const myId = useSelector((state) => state.user.userInfo.userId);
  //평가할 사람들 목록
  const _postInfo = postInfo.nowMember.filter((v) => v.memberId !== myId);
  //다른 사람 id
  const otherId = postInfo.nowMember.map((v, i) => v.memberId);

  //좋아요||싫어요
  const [evalue, setEvalue] = useState([]);
  console.log(evalue);

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalData, setModalData] = useState(null);

  //신고 대상 & 신고 내용 state
  const [report, setReport] = useState("");
  console.log(report);
  const [rUserId, setRUserId] = useState("");
  console.log(report, rUserId);

  //다른 사람 평가
  const addReview = () => {
    const formData = new FormData();
    formData.append("image", reviewImg);
    formData.append("content", review);
    for (var i = 0; i < otherId.length; i++) {
      formData.append("otherId[]", otherId[i]);
    }
    for (var j = 0; j < evalue.length; j++) {
      formData.append("evalues[]", evalue[j]);
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
    dispatch(mypageActions.addReportDB(rUserId, report));
    // history.push("/mypage");
  };

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
                      <input
                        id={i}
                        type="radio"
                        name={i}
                        value={1}
                        onChange={(e) => {
                          setEvalue([...evalue, e.target.value]);
                          if (evalue != e.target.value) {
                            //바꿔치기
                            setEvalue([e.target.value]);
                          }
                        }}
                      />
                      <label>
                        <Select>좋아요</Select>
                      </label>
                      {/* 싫어요 */}
                      <input
                        id={i}
                        type="radio"
                        name={i}
                        value={-1}
                        onChange={(e) => {
                          setEvalue([...evalue, e.target.value]);
                          if (evalue != e.target.value) {
                            //바꿔치기
                            setEvalue([e.target.value]);
                          }
                        }}
                      />
                      <label>
                        <Select>싫어요</Select>
                      </label>
                    </SelectBox>
                    <Report
                      onClick={() => {
                        setIsOpen2(true);
                        setModalData(m);
                      }}
                      report={report}
                    >
                      {report ? "신고완료" : "신고하기"}
                    </Report>
                    <button
                      onClick={() => {
                        addReport();
                      }}
                    >
                      신고하기 test button
                    </button>
                  </Grid>
                </Grid>

                <Modal open={isOpen2}>
                  <ModalData
                    Evaluate
                    _report={report}
                    report={setReport}
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
  }
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

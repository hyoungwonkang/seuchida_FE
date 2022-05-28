import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Image, Text, GoBack } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import { Redirect } from "react-router-dom";

const Evaluation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypageActions.myPostOneDB(postId));
  }, []);

  //ReviewWrite로
  const postInfo = useSelector((state) => state.mypage.myPostOne);
  const postId = postInfo?.postId;
  const photo = useSelector((state) => state.mypage.reviewImg);
  const review = localStorage.getItem("review");

  //로컬 이미지 저장
  localStorage.setItem("reviewImg", photo);

  //내 아이디 가져오기
  useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  //내 id
  const myId = useSelector((state) => state.user.userInfo.userId);
  //평가할 사람들 목록(나 제외)
  const _postInfo = postInfo?.nowMember?.filter((v) => v.memberId !== myId);
  //다른 사람 id
  const otherId = _postInfo?.map((v, i) => v.memberId);
  //이미지 url
  const reviewImg = useSelector((state) => state.mypage.reviewImg);

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [modalData, setModalData] = useState(null);

  //로컬 값 가져오기
  const localreport = JSON.parse(localStorage.getItem("report"));
  const localevalue = JSON.parse(localStorage.getItem("evalue"));

  //다른 사람 평가
  var [evalue, setEvalue] = useState(localevalue ? [...localevalue] : []);
  evalue.length = _postInfo?.length;
  const evalues = evalue.slice(0, otherId?.length);

  //획득 포인트
  const point = evalue.filter((v) => v != undefined).length;

  //신고 대상 & 신고 내용 state
  const [report, setReport] = useState("");
  const [rUserId, setRUserId] = useState(localreport ? localreport : "");

  //후기 작성 & 다른 사람 평가
  const addReview = () => {
    //유효성 검사
    if (evalue.includes(undefined)) {
      setIsOpen(true);
    }
    //로컬 제거
    localStorage.removeItem("review");
    localStorage.removeItem("reviewImg");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
    localStorage.removeItem("report");
    dispatch(
      mypageActions.addReviewDB(review, reviewImg, otherId, evalue, postId)
    );
    history.push("/reviewdone");
  };

  //신고하기
  const addReport = () => {
    dispatch(mypageActions.addReportDB(rUserId, report));
  };

  //로컬 값 저장
  const remove = () => {
    localStorage.setItem("otherId", JSON.stringify(otherId));
    localStorage.setItem("evalue", JSON.stringify(evalue));
    localStorage.setItem("report", JSON.stringify(rUserId));
    history.push(`reviewwrite/${postId}`);
  };

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    //로컬 값 날림
    localStorage.removeItem("review");
    localStorage.removeItem("reviewImg");
    localStorage.removeItem("otherId");
    localStorage.removeItem("evalue");
    localStorage.removeItem("report");

    return <Redirect to="/mypage" />;
  }

  if (!postInfo) return;

  return (
    <Grid bg="white" height="auto">
      <GoBack text="후기 작성하기" remove={remove} />
      <Grid height="auto">
        <Text margin="0px 0px 0px 30px" size="24px" bold>
          함께한 분들은 어땠나요?
        </Text>
        <Text margin="12px 0px 20px 30px" size="16px" color="gray">
          평가를 완료해주시면 <br />
          더블 포인트를 받을 수 있어요
        </Text>

        {/* 다른 사람 평가 */}
        <Grid width="342px" margin="auto" height="300px">
          {_postInfo?.map((m, i) => {
            return (
              <div key={m + i}>
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
                      <label>
                        <input
                          id={m._id}
                          type="radio"
                          name={i}
                          value={1}
                          onChange={(e) => {
                            if (evalue[i] == 1 || -1) {
                              evalue[i] = e.target.value;
                            }
                            setEvalue([...evalue, e.target.value]);
                          }}
                        />
                        <Select1 color={+evalue[i] === 1 ? true : false}>
                          <div className="liha">좋아요</div>
                          <div>+1 포인트</div>
                        </Select1>
                      </label>
                      <label>
                        <input
                          id={m._id}
                          type="radio"
                          name={i}
                          value={-1}
                          onChange={(e) => {
                            if (evalue[i] == 1 || -1) {
                              evalue[i] = e.target.value;
                            }
                            setEvalue([...evalue, e.target.value]);
                          }}
                        />
                        <Select2 color={+evalue[i] === -1 ? true : false}>
                          <div className="liha">별로에요</div>
                          <div>-1 포인트</div>
                        </Select2>
                      </label>
                    </SelectBox>
                    {/* 신고하기 */}
                    <Report
                      onClick={() => {
                        setIsOpen2(true);
                        setModalData(m);
                      }}
                      report={rUserId === otherId[i] ? true : false}
                    >
                      {rUserId === otherId[i] ? "신고 완료" : "신고 하기"}
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
      <FooterMenu next text={`+${evalues.length} 포인트`} event={addReview} />

      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData
          Alert
          onClose={() => setIsOpen(false)}
          text="모두 평가해주세요."
        />
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
  label {
    display: inline-block;
  }
  input {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`;

//카테고리 한 개 좋아요
const Select1 = styled.div`
  width: 104px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px 2px 10px 2px;
  text-align: center;
  border: 1px solid #0ed88b;
  border-radius: 5px;
  font-size: 16px;
  background: ${(props) => (props.color ? "#0ED88B" : "white")};
  color: ${(props) => (props.color ? "white" : "#0ed88b;")};
  .liha {
    font-size: 16px;
  }
  div {
    font-size: 12px;
  }
`;
//카테고리 한 개 별로에요
const Select2 = styled.div`
  width: 104px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px 2px 10px 2px;
  text-align: center;
  border: 1px solid #ff6b52;
  border-radius: 5px;
  font-size: 16px;
  background: ${(props) => (props.color ? "#FF6B52" : "white")};
  color: ${(props) => (props.color ? "white" : "#FF6B52")};
  .liha {
    font-size: 16px;
  }
  div {
    font-size: 12px;
  }
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
  color: ${(props) => (props.report ? "white" : "#ddd")};
`;

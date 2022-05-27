import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FooterMenu from "../shared/FooterMenu";
import { Grid, Text, GoBack } from "../elements/Index";
import Modal from "../components/Modal/Modal";
import ModalData from "../components/Modal/ModalData";
import { Redirect } from "react-router-dom";

import { IconContext } from "react-icons";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdEdit, MdRememberMe } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

const PostWrite_2 = (props) => {
  document.body.style.overscrollBehavior = "none";
  const history = useHistory();

  //모달 오픈 state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  //인원
  let [maxMember, setMaxMember] = useState("");
  maxMember = parseInt(maxMember);
  const onIncrease = () => {
    setMaxMember(maxMember + 1);
    if (maxMember > 29) {
      setMaxMember(maxMember);
      setIsOpen2(true);
    }
  };

  const onDecrease = () => {
    setMaxMember(maxMember - 1);
    if (maxMember < 3) {
      setMaxMember(maxMember);
      setIsOpen2(true);
    }
  };

  //성별
  const [memberGender, setMemberGender] = useState("");

  //나이
  let [memberAge, setMemberAge] = useState("");

  //'직접입력' 시 나이를 조합합니다.
  const [member, setMember] = useState({
    fage: "",
    lage: "",
  });
  let combine_member = member.fage + "~" + member.lage + "세";

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  if (memberAge === "나이무관") {
    member.fage = "나이가";
    member.lage = "무관하다";
  }

  console.log(member.lage);
  console.log(member.fage);

  // '직접입력' 시 조합된 나이로 보내줍니다.
  if (7 > combine_member.length) {
    memberAge = combine_member;
  }

  const AgeCompare = () => {
    //유효성 검사
    if (memberGender === "" || memberAge === "" || !showOptions) {
      setIsOpen(true);
    }
    // 나이 이상한 값 체크
    if (
      Number(member.lage) <= Number(member.fage) ||
      member.fage === "0" ||
      member.lage === "0" ||
      Number(member.lage) >= 100 ||
      Number(member.fage) >= 99
    ) {
      setIsOpen3(true);
    } else {
      localStorage.setItem("maxMember", maxMember); // 로컬스토리지에 저장합니다.
      localStorage.setItem("memberGender", memberGender); // 로컬스토리지에 저장합니다.
      localStorage.setItem("memberAge", memberAge); // 로컬스토리지에 저장합니다.
      localStorage.setItem("showOptions", showOptions); // 로컬스토리지에 저장합니다.
      history.push("/postwrite3");
    }
  };

  // 뒤로가기 시에도 데이터를 유지합니다.
  useEffect(() => {
    setMaxMember(window.localStorage.getItem("maxMember"));
    setMemberGender(window.localStorage.getItem("memberGender"));
    setMemberAge(window.localStorage.getItem("memberAge"));
    setShowOptions(window.localStorage.getItem("showOptions"));
  }, []);

  //토글
  const [show, setShow] = useState(false);
  let [showOptions, setShowOptions] = useState("");

  //프로그레스바
  let count = 1;
  if (maxMember > 1) {
    count++;
  }

  const backEvent = () => {
    localStorage.setItem("maxMember", maxMember);
    localStorage.setItem("memberGender", memberGender);
    localStorage.setItem("memberAge", memberAge);
    localStorage.setItem("showOptions", showOptions);
    history.push("/postwrite1");
  };

  // console.log(postCategory, postTitle, postDesc);

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.setItem("address", "");
    localStorage.setItem("spot", "");
    localStorage.setItem("latitude", "");
    localStorage.setItem("longitude", "");
    localStorage.setItem("datemate", "");
    localStorage.setItem("memberAge", "");
    localStorage.setItem("memberGender", "");
    localStorage.setItem("maxMember", 2);
    localStorage.setItem("postCategory", "");
    localStorage.setItem("postTitle", "");
    localStorage.setItem("postDesc", "");
    localStorage.setItem("showOptions", "");
    localStorage.setItem("showDate", "");
    localStorage.setItem("showTime", "");
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    return <Redirect to="/postcategory" />;
  }

  return (
    <>
      <Container>
        <GoBack postBack text="모임 만들기" state={backEvent} />
        <Grid margin="24px 0px 40px 0px">
          <ProgressBar>
            <HighLight width={(count / 3) * 100 + "%"} />
          </ProgressBar>
        </Grid>
        <LineBox>
          <Grid row margin="12px 0px" height="auto" justify="space-between">
            <Grid row margin="0px 0px 0px 24px">
              <IconContext.Provider value={{ color: "#787878", size: "16px" }}>
                <BsFillPeopleFill />
              </IconContext.Provider>
              <Text bold width="40px" margin="0px 12px" size="16px">
                인원
              </Text>
            </Grid>
            <Grid row margin="0px 24px 0px 172px">
              <div onClick={onDecrease}>
                <IconContext.Provider
                  value={{ color: "#DDDDDD", size: "28px" }}
                >
                  <AiOutlineMinusCircle />
                </IconContext.Provider>
              </div>
              <Grid margin="0px 0px 6px 0px">
                {" "}
                &nbsp;{maxMember}&nbsp;명&nbsp;{" "}
              </Grid>
              <div onClick={onIncrease}>
                <IconContext.Provider
                  value={{ color: "#DDDDDD", size: "28px" }}
                >
                  <AiOutlinePlusCircle />
                </IconContext.Provider>
              </div>
            </Grid>
          </Grid>
        </LineBox>
        <Grid row margin="12px 0px 20px 0px" padding="0px 24px 4px 24px">
          <IconContext.Provider value={{ color: "#787878", size: "24px" }}>
            <MdEdit />
          </IconContext.Provider>
          <Text bold width="100px" margin="0px 12px">
            모집조건
          </Text>
          <Grid _onClick={() => setShow(!show)} isFlex_end>
            {show ? (
              <div
                onClick={() => setShowOptions(memberGender + `, ` + memberAge)}
                style={{ color: "#000000" }}
              >
                확인
              </div>
            ) : showOptions ? (
              showOptions === localStorage.getItem("showOptions") ? (
                memberGender + `, ` + localStorage.getItem("memberAge")
              ) : (
                memberGender + `, ` + memberAge
              )
            ) : (
              <div style={{ color: "#C4C4C4" }}>조건 선택</div>
            )}
          </Grid>
        </Grid>
        <Grid>
          {show ? (
            <div>
              <GenderBox>
                <Text>성별</Text>
                <Grid margin="0px 0px 32px 0px">
                  <form
                    onChange={(e) => {
                      setMemberGender(e.target.value);
                    }}
                  >
                    <Grid>
                      <RadioInput type="radio" name="state" value="성별무관" />{" "}
                      성별무관&nbsp;&nbsp;&nbsp;&nbsp;
                      <RadioInput
                        type="radio"
                        name="state"
                        value="여성만"
                      />{" "}
                      여성만&nbsp;&nbsp;&nbsp;&nbsp;
                      <RadioInput
                        type="radio"
                        name="state"
                        value="남성만"
                      />{" "}
                      남성만
                    </Grid>
                  </form>
                </Grid>
              </GenderBox>
              <AgeBox>
                <Text>나이</Text>
                <form
                  onChange={(e) => {
                    setMemberAge(e.target.value);
                  }}
                >
                  <Grid>
                    <Grid>
                      <RadioInput type="radio" name="state" value="나이무관" />{" "}
                      나이무관&nbsp;&nbsp;&nbsp;&nbsp;
                      <RadioInput
                        type="radio"
                        name="state"
                        value={member.fage + member.lage}
                      />{" "}
                      직접입력
                    </Grid>
                    <Grid row margin="28px 0px" padding="0px 8px">
                      <label>
                        <input
                          type="number"
                          name="fage"
                          value={member.fage}
                          onChange={handleChange}
                          placeholder="시작 나이 ex) 20"
                          style={{
                            width: "136px",
                            height: "52px",
                            textAlign: "center",
                            fontSize: "16px",
                            background: "#f1f1f5",
                            border: "none",
                          }}
                          pattern="/[^ㄱ-ㅎ가-힣]/g"
                          min="1"
                          max="98"
                        />
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      <Text size="18px" bold>
                        -
                      </Text>
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="number"
                          name="lage"
                          value={member.lage}
                          onChange={handleChange}
                          placeholder="끝 나이 ex) 29"
                          style={{
                            width: "136px",
                            height: "52px",
                            textAlign: "center",
                            fontSize: "16px",
                            background: "#f1f1f5",
                            border: "none",
                          }}
                          pattern="/[^ㄱ-ㅎ가-힣]/g"
                          min="2"
                          max="99"
                        />
                      </label>
                    </Grid>
                  </Grid>
                </form>
              </AgeBox>
            </div>
          ) : null}
        </Grid>
        <FooterMenu next text="다음" event={AgeCompare} />
        {/* 경고창 모달 */}
        <Modal open={isOpen}>
          <ModalData
            Alert
            text="내용을 모두 입력해주세요"
            onClose={() => setIsOpen(false)}
          />
        </Modal>
        <Modal open={isOpen2}>
          <ModalData
            Alert
            text="2 ~ 30명만 가능해요"
            onClose={() => setIsOpen2(false)}
          />
        </Modal>
        <Modal open={isOpen3}>
          <ModalData
            Alert
            text="나이를 정확히 입력해주세요"
            onClose={() => setIsOpen3(false)}
          />
        </Modal>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 0px;
`;

const LineBox = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

const GenderBox = styled.div`
  padding: 0px 24px;
`;

const AgeBox = styled.div`
  padding: 0px 24px;
`;

const ProgressBar = styled.div`
  background: #eee;
  width: 85%;
  height: 4.5px;
  margin-left: 28px;
  margin-bottom: 28px;
`;

const HighLight = styled.div`
  background: #0ed88b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

// const AgeInput = styled.input`
//   /* ::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   } */
//   ::-webkit-outer-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }
// `;

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
export default PostWrite_2;

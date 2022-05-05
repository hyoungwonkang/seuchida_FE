import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import gBack from "../shared/ImgBox/gBack.png";
import FooterMenu from "../shared/FooterMenu";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Button } from "../elements/Index";

const PostWrite_2 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postCategory = props.location.state.postCategory;
  const postTitle = props.location.state.postTitle;
  const postDesc = props.location.state.postDesc;
  const addContents = () => {
    dispatch(
      postActions.postContents(
        memberAge,
        memberGender,
        maxMember,
        postCategory,
        postTitle,
        postDesc
      )
    );
  };

  //인원
  const [maxMember, setMaxMember] = useState(0);

  const onIncrease = () => {
    setMaxMember(maxMember + 1);
    if (maxMember > 29) {
      setMaxMember(maxMember);
      alert("제한인원은 30명까지 입니다.");
    }
  };

  const onDecrease = () => {
    setMaxMember(maxMember - 1);
    if (maxMember < 1) {
      setMaxMember(maxMember);
      alert("잘못된 입력입니다.");
    }
  };

  //성별
  const [memberGender, setMemberGender] = useState("");

  //나이
  let [memberAge, setMemberAge] = useState({});

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

  // '직접입력' 시 조합된 나이로 보내줍니다.
  if (combine_member.length > 2) {
    memberAge = combine_member;
  }

  return (
    <>
      <Container>
        <HeadWarp>
          <Gback>
            <img src={gBack} />
          </Gback>
          <HeadTitle>모임 만들기</HeadTitle>
        </HeadWarp>
        <CountWrap>
          인원
          <button onClick={onDecrease}>-</button>
          {maxMember}
          <button onClick={onIncrease}>+</button>
        </CountWrap>
        <GenderBox>
          성별
          <form
            onChange={(e) => {
              setMemberGender(e.target.value);
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <input type="radio" name="state" value="누구나" /> 누구나
            <input type="radio" name="state" value="여성만" /> 여성만
            <input type="radio" name="state" value="남성만" /> 남성만
          </form>
        </GenderBox>
        <AgeBox>
          나이
          <form
            onChange={(e) => {
              setMemberAge(e.target.value);
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <input type="radio" name="state" value="누구나" /> 누구나
            <input
              type="radio"
              name="state"
              value={member.fage + member.lage}
            />{" "}
            직접입력
            {/* <input type='text' name='state' /> */}
            <label>
              <input
                type="text"
                name="fage"
                value={member.fage}
                onChange={handleChange}
              />
            </label>
            {"~"}
            <label>
              <input
                type="text"
                name="lage"
                value={member.lage}
                onChange={handleChange}
              />
            </label>
            {"세"}
          </form>
        </AgeBox>
        {/* <Link
          to={{
            // pathname: '/postwrite3',
            state: {
              maxMember,
              memberGender,
              memberAge,
              postCategory,
              postTitle,
              postDesc,
            },
          }}
        > */}
        {/* <FooterMenu
          next
          path='/postwrite3'
          text='다음'
          onClick={addContents}
          event={maxMember < 2 ? alert('인원을 2명 이상 설정해 주세요') : ''}
        /> */}
        <Button _onClick={addContents}>다음</Button>
        {/* </Link> */}
      </Container>
    </>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

const HeadWarp = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
`;
const Gback = styled.div``;

const HeadTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

const CountWrap = styled.div`
  display: flex;
`;

const GenderBox = styled.div``;

const AgeBox = styled.div``;

const Next = styled.button`
  width: 350px;
  height: 45px;
  margin-top: 10%;
  border: none;
  background: gray;
`;

export default PostWrite_2;

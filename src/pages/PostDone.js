import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Text } from "../elements/Index";
import FooterMenu from "../shared/FooterMenu";

const PostDone = () => {
  document.body.style.overscrollBehavior = "none";
  const history = useHistory();

  // if (history.action === "POP") {
  //   window.location.href = "/main";
  // }

  //뒤로가기 시 메인 페이지로 이동합니다.
  window.onpopstate = function (event) {
    if (event) {
      window.location.href = "/main";
    }
  };

  //새로고침 시 메인 페이지로 이동
  if (document.readyState === "interactive") {
    window.location.href = "/main";
  }

  //localStorage에 있는 데이터를 삭제합니다.
  localStorage.removeItem("address");
  localStorage.removeItem("spot");
  localStorage.removeItem("latitude");
  localStorage.removeItem("longitude");
  localStorage.removeItem("datemate");
  localStorage.removeItem("memberAge");
  localStorage.removeItem("memberGender");
  localStorage.removeItem("maxMember");
  localStorage.removeItem("postCategory");
  localStorage.removeItem("postTitle");
  localStorage.removeItem("postDesc");
  localStorage.removeItem("searchPlace");
  localStorage.removeItem("value");
  localStorage.removeItem("pageTime");
  localStorage.removeItem("dayDate");
  localStorage.removeItem("inputText");
  localStorage.removeItem("showOptions");

  const setDone = () => {
    window.location.href = "/main";
  };

  return (
    <Grid column margin="167px auto 0px auto">
      <img src="/img/seuchin.png" alt="seuchin" />
      <Text bold margin="16px 0px 0px 0px" size="24px">
        모집 등록이 완료되었습니다!
      </Text>
      <Text size="16px" margin="12px 0px 4px 0px" color="#787878">
        내가 만든 모임은 마이페이지에서
      </Text>
      <Text size="16px" margin="0px" color="#787878">
        확인할 수 있어요
      </Text>
      <FooterMenu next state={setDone} text="확인" />
    </Grid>
  );
};

export default PostDone;

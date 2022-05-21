import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const KakaoRedirect = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);
};

export default KakaoRedirect;

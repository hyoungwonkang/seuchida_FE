import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const GoogleRedirect = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(userActions.googleLogin(code));
  }, []);
};

export default GoogleRedirect;

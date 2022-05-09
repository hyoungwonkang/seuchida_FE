import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    is_delete,
    children,
    margin,
    width,
    padding,
    border,
    right,
    bold,
    bg,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    border: border,
    bold: bold,
    right: right,
    bg: bg,
  };
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  if (is_delete) {
    return (
      <React.Fragment>
        <DeleteButton {...styles} onClick={_onClick}>{text ? text : children}</DeleteButton>
      </React.Fragment>
    );
  }



  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  border: false,
  bg: false,
};

const ElButton = styled.button`
  width: 342px;
  height: 54px;
  background: #5796F7;
  ${(props) => (props.bg ? `background: #FDE333` : "")};
  color: white;
  font-weight: bold;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.right ? `float: right` : "")} /* &:hover {
    box-shadow: 0px 0px 5px 0px gray;
  }
  font-family: "Cafe24Ohsquareair"; */
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #ffe05d;
  color: #525e75;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  /* &:hover {
    box-shadow: 0px 0px 5px 0px gray;
  }
  font-family: "Cafe24Ohsquareair"; */
`;

const DeleteButton = styled.button`
  width: 342px;
  height: 54px;
  background: #C4C4C4;
  ${(props) => (props.bg ? `background: #FDE333` : "")};
  color: white;
  font-weight: bold;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.right ? `float: right` : "")}
  /* &:hover {
    box-shadow: 0px 0px 5px 0px gray;
  }
  font-family: "Cafe24Ohsquareair"; */
`;

export default Button;

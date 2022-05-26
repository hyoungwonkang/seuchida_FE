import React, { forwardRef } from "react";
import styled from "styled-components";

import { Text, Grid } from "./Index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    keyUp,
    keyPress,
    chatName,
    bold,
    size,
    width,
    height,
    wd,
    bg,
    margin,
    background,
  } = props;

  const styles = {
    placeholder,
    onChange: _onChange,
    type,
    multiLine,
    keyUp,
    keyPress,
    chatName,
    bold,
    size,
    width,
    height,
    value,
    wd,
    bg,
    margin,
    background,
  };
  //플레이스홀더, 라벨속성 지정가능, onChange:_onChange로 지정
  if (multiLine) {
    return (
      <React.Fragment>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea {...styles} rows={10}></ElTextarea>
      </React.Fragment>
    );
  }

  if (chatName) {
    return (
      <Grid>
        <ElChatName {...styles} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput {...styles} />
    </React.Fragment>
  );
};

Input.defaultProps = {
  width: "390px",
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
  keyUp: () => {},
  keyPress: () => {},
  bold: false,
  margin: false,
  maxLength: "10",
  background: "#F1F1F5",
};

const ElTextarea = styled.textarea`
  border: none;
  border-radius: 5px;
  background: ${(props) => props.bg};
  max-width: 420px;
  min-width: 330px;
  width: 340px;
  ${(
    props //성별/나이 input 창
  ) =>
    props.wd ? `width: 213px; background: white; border: 1px solid #ddd;` : ""};
  height: ${(props) => props.height};
  padding: 12px 10px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  resize: none;
`;

//기본 Input
const ElInput = styled.input`
  border: none;
  border-radius: 5px;
  background: #f1f1f5;
  max-width: 420px;
  min-width: 330px;
  width: 340px;
  ${(
    props //성별/나이 input 창
  ) =>
    props.wd ? `width: 213px; background: white; border: 1px solid #ddd;` : ""};
  height: ${(props) => props.height};
  padding: 12px 10px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

const ElChatName = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

export default Input;

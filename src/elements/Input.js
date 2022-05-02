import React from "react";
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
  } = props;
  //플레이스홀더, 라벨속성 지정가능, onChange:_onChange로 지정
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          bold={bold}
          size={size}
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  if (chatName) {
    return (
      <Grid>
        <ElChatName placeholder={placeholder} onChange={_onChange} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput
          bold={bold}
          size={size}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyUp={keyUp}
          onKeyPress={keyPress}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
  keyUp: () => {},
  keyPress: () => {},
  bold: false,
  size: false,
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  font-family: "Jal_Haru";
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  font-family: "Jal_Haru";
`;

const ElChatName = styled.input`
  border: 1px solid #212121;
  width: 100px;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  font-family: "Jal_Haru";
`;

export default Input;

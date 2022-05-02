import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    bold,
    color,
    size,
    children,
    textIndent,
    _onClick,
    margin,
    width,
    height,
    text_align,
  } = props;
  const styles = {
    bold,
    color,
    size,
    textIndent,
    _onClick,
    margin,
    width,
    height,
    text_align,
  };
  return (
    <React.Fragment>
      <Textbox {...styles}>{children}</Textbox>
    </React.Fragment>
  );
};

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "16px",
  textIndent: false,
  _onClick: () => {},
  margin: false,
};
//텍스트박스:color, font-size, bold value 지정 가능
const Textbox = styled.p`
  /* width: ${(props) => props.width};
  height: ${(props) => props.height}; */
  ${(props) => (props.text_align ? `text-align: center` : "")}
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: bold;
  text-indent: ${(props) => props.textIndent};
  margin: ${(props) => props.margin};
`;

export default Text;

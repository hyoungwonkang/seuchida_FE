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
    right,
    left,
    position,
    br,
    zIndex,
    el,
  } = props;
  const styles = {
    bold,
    color,
    size,
    textIndent,
    onClick: _onClick,
    margin,
    width,
    height,
    text_align,
    right,
    left,
    position,
    br,
    zIndex,
    el,
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
  width: ${(props) => props.width};
  ${(props) => (props.text_align ? `text-align: center` : "")}
  ${(props) => (props.zIndex ? `z-index: 100` : "")}
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  ${(props) => (props.bold ? `font-weight: bold` : "")};
  text-indent: ${(props) => props.textIndent};
  margin: ${(props) => props.margin};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  ${(props) => (props.position ? `position: absolute` : "")};
  ${(props) =>
    props.br
      ? `border: 1px solid gray; border-radius: 20px; padding: 3px 5px;`
      : ""};
  ${(props) =>
    props.el
      ? `overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;`
      : ""};
`;

export default Text;

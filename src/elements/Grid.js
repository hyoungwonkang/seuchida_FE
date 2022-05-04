import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    width,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
    column,
    row,
    height,
    border,
    br,
    brbottom,
    bottom,
    right,
    position,
  } = props;

  const styles = {
    column: column,
    row: row,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    _onClick: _onClick,
    height: height,
    border: border,
    br: br,
    brbottom: brbottom,
    bottom: bottom,
    right: right,
    position: position,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  column: false,
  row: false,
  bottom: false,
  right: false,
  position: false,
};

const GridBox = styled.div`
  width: 390px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box; //총 넓이에 padding과 border를 포함하는가? //yes
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.column
      ? `display: flex; flex-direction: column; align-items: center; justify-content: space-between;`
      : ""}
  ${(props) =>
    props.row
      ? `display: flex; flex-direction: row; align-items: center; justify-content: center;`
      : ""}
  ${(props) => (props.center ? `text-align: center` : "")}
  border: ${(props) => props.border};
  border-radius: ${(props) => props.br};
  ${(props) =>
    props.brbottom
      ? `border-bottom-left-radius: 20px; border-bottom-right-radius: 20px`
      : ""}
  ${(props) => (props.bottom ? `bottom: 0px` : "")}
  ${(props) => (props.right ? `right: 0px` : "")}
  ${(props) => (props.position ? `position: fixed` : "")}
`;

export default Grid;

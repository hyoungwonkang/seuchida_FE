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
    border_bottom,
    br,
    bottom,
    right,
    position,
    justify,
    isFlex_end,
    shadow,
    stop,
    bordernone,
  } = props;

  const styles = {
    column: column,
    row: row,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    onClick: _onClick,
    height: height,
    border: border,
    border_bottom,
    br: br,
    bottom: bottom,
    right: right,
    position: position,
    justify: justify,
    isFlex_end: isFlex_end,
    shadow: shadow,
    stop: stop,
    bordernone: bordernone,
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
  isFlex_end: false,
};

const GridBox = styled.div`
  width: 390px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.column
      ? `display: flex; flex-direction: column; align-items: center; justify-content: space-between;`
      : ""}
      ${(props) =>
    props.row ? `display: flex; flex-direction: row; align-items: center;` : ""}
  justify-content: ${(props) => props.justify};
  ${(props) => (props.center ? `text-align: center` : "")}
  border: ${(props) => props.border};
  ${(props) =>
    props.bordernone ? `border-right: none; border-left: none` : ""};
  border-bottom: ${(props) => props.border_bottom};
  border-radius: ${(props) => props.br};
  ${(props) => (props.bottom ? `bottom: 0px` : "")}
  ${(props) => (props.right ? `right: 0px` : "")}
  ${(props) => (props.position ? `position: fixed` : "")}
  ${(props) =>
    props.isFlex_end
      ? `display: flex; align-items: center; justify-content: end;`
      : null}
  ${(props) => (props.stop ? `overscroll-behavior: none` : "")}
`;

export default Grid;

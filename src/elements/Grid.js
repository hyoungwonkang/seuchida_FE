import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
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
  } = props;
  // console.log(children)

  const styles = {
    is_flex: is_flex,
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
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  column: false,
  row: false,
};

const GridBox = styled.div`
  width: 420px;
  height: ${(props) => props.height};
  box-sizing: border-box; //총 넓이에 padding과 border를 포함하는가? //yes
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    props.column
      ? `display: flex; flex-direction: column; align-items: center; justify-content: space-between;`
      : ""}
  ${(props) =>
    props.row
      ? `display: flex; flex-direction: row; align-items: center; justify-content: space-between;`
      : ""}
  ${(props) => (props.center ? `text-align: center` : "")}

  border: ${(props) => props.border};
  ${(props) => (props.br ? `border-radius: 25px` : "")}
`;

export default Grid;

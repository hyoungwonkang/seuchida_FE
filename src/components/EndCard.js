import React from "react";
import styled from "styled-components";
const EndCard = () => {
  return (
    <>
      <Container>
        <Box>
          <Flex 플렉스 스페이스 비트윈>
            <div>점 모집</div>
            <div>
              <span>사람콘</span>현황
            </div>
          </Flex>
          <Desc>

     내용 

          </Desc>

          <div>후기완료</div>
        </Box>
      </Container>
    </>
  );
};

export default EndCard;

const Container = styled.section`
  width: 233px;
  height: 155px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  background-color: #f5f5f5;
`;

const Box = styled.div`
  align-items: center;
  padding: 20px;
`;

const Flex = styled.div`
display: flex;
justify-content: space-between;

`

const Desc = styled.div`
padding: 15px 0px;

`
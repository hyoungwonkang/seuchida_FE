import React from "react";
import styled from "styled-components";

const Card = ({ MainCard, DetailCard }) => {
  if (MainCard) {
    return (
      <>
        <MainContainer>
          <div>
            <TextBox>
              <div style={{ marginBottom: "6px" }}>
                <BoldTitle>· 모집중</BoldTitle>
                <span>게시글 제목</span>
              </div>

              <div style={{ margin: "10px 0px" }}>
                <StatusBox>모두 참여 가능</StatusBox>
                <StatusBox>오늘</StatusBox>
                <StatusBox>2/3명 참여</StatusBox>
              </div>

              <div>
                <Desc>수림님은 근린공원에서 배드민턴이 매우 치고싶다...</Desc>
              </div>
            </TextBox>

            <div>
              <Join
                style={{
                  borderTop: "1px solid #E0E0E0",
                  justifyContent: "space-around",
                }}
              >
                <ProfileBox>
                  <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
                  <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
                  <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
                </ProfileBox>
                <SmallFont>500m 떨어짐| 1분전</SmallFont>
              </Join>
            </div>
          </div>
        </MainContainer>
      </>
    );
  }

  return (
    <Container>
      <TextBox>
        <div style={{ marginBottom: "12px" }}>
          <BoldTitle>· 모집중</BoldTitle>
          <span>게시글 제목</span>
        </div>

        <div>
          <StatusBox>모두참여가능</StatusBox>
          <StatusBox>오늘</StatusBox>
          <StatusBox>2/3명 참여</StatusBox>
        </div>

        <DescBox>
          <Desc>
            근린공원에서 같이 배드민턴 쳐요~ 아예 생 초보분들도 같이 즐기면서
            치면 좋아요!
          </Desc>
        </DescBox>

        <div>
          <Join>
            {DetailCard ? (
            null
            ) : (
              <ProfileBox>
                <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
                <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
                <Profile src="https://cdn.gukjenews.com/news/photo/202201/2388626_2381760_1339.jpg" />
              </ProfileBox>
            )}

            <SmallFont>500m 떨어짐| 1분전</SmallFont>
          </Join>
        </div>
      </TextBox>
    </Container>
  );
};

export default Card;

const MainContainer = styled.section`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 342px;
  height: 214px;
  margin-bottom: 14px;
`;

const Container = styled.section`
  width: 100%;
  min-height: 150px;
  background-color: white;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

const Desc = styled.div`
  font-size: 17px;
  padding-top: 4px;
`;

const DescBox = styled.div`
  margin: 12px 0px;
`;

const Join = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Profile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 10px;
  margin-right: 5px;
`;

const TextBox = styled.div`
  padding: 20px 24px 24px 24px;
  align-items: center;
`;

const BoldTitle = styled.span`
  /* font-weight: 900; */
  font-weight: bold;
  font-size: 17px;
  margin-right: 15px;
`;

const StatusBox = styled.span`
  background-color: #e5e5e5;
  border-radius: 30px;
  margin-right: 8px;
  padding: 6px 10px;
  font-size: 12px;
  height: 26px;
`;

const SmallFont = styled.div`
  color: #787878;
  font-size: 12.5px;
  margin-top: 16px;
`;

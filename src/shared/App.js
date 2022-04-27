import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import FooterMenu from "../shared/FooterMenu";
import Main from "../pages/Main";
import SignupLoca from "../pages/LoginPages/SignupLoca";
import AddProfile from "../pages/LoginPages/AddProfile";
import Category from "../pages/LoginPages/Category";
import SignupDone from "../pages/LoginPages/SignupDone";
import Time from "../components/Time";
import Calendar from "../components/Calendar";
import Done from "../pages/LoginPages/Done";

function App() {
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <Route path="/main" exact component={Main} />
          <Route path="/signuploca" exact component={SignupLoca} />
          <Route path="/addprofile" exact component={AddProfile} />
          <Route path="/time" exact component={Time} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/category" exact component={Category} />
          <Route path="/signupdone" exact component={SignupDone} />
          <Route path="/done" exact component={Done} />
          <FooterMenu />
        </ConnectedRouter>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: beige;
  min-height: 100vh;
`;

export default App;

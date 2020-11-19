import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-areas:
    "header"
    " . "
    "main"
    " . "
    "footer";
`;
const Header = styled.div`
  grid-area: header;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  grid-area: footer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Auth = (match) => {
  return (
    <Container>
      <Header>Authentication</Header>
      <Main>Loading...</Main>
      <Footer>
        <h6>Copyright (c) 2020 Nayoon. All Rights Reserved.</h6>
      </Footer>
    </Container>
  );
};

export default Auth;

// import React, { useState } from "react";
import React from "react";
import styled from "styled-components";
import nayoon1 from "../imgs/nayoon-1.jpeg";
import dotenv from "dotenv";
dotenv.config();

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

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 200px;
  height: 250px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  margin: 20px 0px;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <h1>
          <span role="img" aria-label="">
            ♥️
          </span>{" "}
          나윤's 홈페이지{" "}
          <span role="img" aria-label="">
            ♥️
          </span>
        </h1>
        <Image bgUrl={nayoon1}></Image>
        <h3>내 이름은 '이나윤'입니다~~ :D</h3>
      </Header>
      <Main>
        <h1>안녕하세요 ^_^</h1>
      </Main>
      <Footer>
        <h6>Copyright (c) 2020 Nayoon. All Rights Reserved.</h6>
      </Footer>
    </Container>
  );
};

export default Home;

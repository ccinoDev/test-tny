import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: "Jua", sans-serif;
    background-color: #ffffff;
    box-sizing: border-box;
    color: #35465d;
  }
`;

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}></Route>
      <Route path="/:id" component={Detail}></Route>
      <GlobalStyle></GlobalStyle>
    </Router>
  );
}

export default App;

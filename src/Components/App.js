import React from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

// const GlobalStyle = createGlobalStyle`
//   body{
//     padding: 0;
//     margin: 0;
//     font-family: "Jua", sans-serif;
//     background-color: #ffffff;
//     box-sizing: border-box;
//     color: #35465d;
//   }
// `;

const App = () => {
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
};

export default App;

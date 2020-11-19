import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const Auth = (match) => {
  const checkURI = () => {
    const { params } = match;
    console.log(params);
  };

  useEffect(() => {
    checkURI();
  }, []);

  return <Container>인증중입니다...</Container>;
};

export default Auth;

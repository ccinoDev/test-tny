import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
  font-size: 16px;
  padding-left: 15px;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  &:hover {
    color: rgb(126, 214, 223);
  }
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: rgb(255, 242, 0);
  margin-right: 30px;
  margin-left: 20px;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item>
        <SLink to="/">
          <Home>Home</Home>
        </SLink>
      </Item>
      <Item
        current={pathname === "/diary" || pathname.substring(0, 2) === "/m"}
      >
        <SLink to="/diary">Diary</SLink>
      </Item>
      <Item current={pathname === "/etc" || pathname.substring(0, 3) === "/sh"}>
        <SLink to="/etc">Etc</SLink>
      </Item>
    </List>
  </Header>
));

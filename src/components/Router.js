/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "../Routes/Home";
import Detail from "../Routes/Detail";
import Header from "./Header";
import Diary from "../Routes/Diary";
import Etc from "../Routes/Etc";
import Auth from "../Routes/Auth";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/diary" exact component={Diary}></Route>
      <Route path="/calendar/:id" component={Detail} />
      <Route path="/etc" component={Etc}></Route>
      <Route path="/auth" component={Auth}></Route>
      <Redirect from="*" to="/"></Redirect>
    </Switch>
  </Router>
);

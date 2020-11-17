import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { changeDate } from "../store";
import styled from "styled-components";
import { useAsync } from "react-async";
import { instaApi } from "../api";
import dotenv from "dotenv";
import Calendar from "../Components/Calendar";
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

const Diary = ({ date, changeDate }) => {
  // const { data: posts, error, isLoading } = useAsync({
  //   promiseFn: getDatafromInsta,
  // });

  const getDatafromInsta = async () => {
    try {
      window.open(
        "https://api.instagram.com/oauth/authorize?client_id=2634490610102589&redirect_uri=https://nayoon.netlify.app/auth&&scope=user_profile,user_media&response_type=code"
      );
    } catch {
      console.log("error!!");
    } finally {
    }
  };

  useEffect(() => {
    getDatafromInsta();
  }, []);

  // if (isLoading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다</div>;
  // if (!posts) return <div>포스팅이 없습니다!!!</div>;

  return (
    <Container>
      <Header>
        <h1>
          <span role="img" aria-label="">
            ♥️
          </span>{" "}
          나윤's Diary{" "}
          <span role="img" aria-label="">
            ♥️
          </span>
        </h1>
      </Header>
      <Main>
        <Calendar date={date} changeDate={changeDate}></Calendar>
      </Main>
      <Footer>
        <h6>Copyright (c) 2020 Nayoon. All Rights Reserved.</h6>
      </Footer>
    </Container>
  );
};

function mapStateToProps(state) {
  return { date: state.date };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDate: (date) => dispatch(changeDate(date)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);

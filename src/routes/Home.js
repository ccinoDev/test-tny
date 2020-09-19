// import React, { useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { add } from "../store";
// import ToDo from "../components/ToDo";
import styled from "styled-components";
import tny1 from "../imgs/tny-1.png";
import axios from "axios";
import { useAsync } from "react-async";
import moment from "moment";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    " . "
    "main"
    " . "
    "footer";
  ${"" /* justify-items: center; */}
`;

const Header = styled.div`
  grid-area: header;
  font-size: 60px;
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

const Image = styled.img`
  width: 100px;
  height: 70px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const SmallImage = styled.img`
  width: 60px;
  height: 45px;
  margin: 5px;
`;

const Grid = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 1px;
`;

const Item = styled.div`
  text-align: center;
  background-color: #ffeaa7;
  border-style: solid;
  border-radius: 10px;
  &:nth-child(1) {
    color: #f53b57;
  }
  &:nth-child(7) {
    color: #3c40c6;
  }
`;

const ItemDate = styled(Item)`
  background: ${(props) => props.color || "#dff9fb"};
  height: 100px;
`;

const FIELDS =
  "id,media_type,media_url,permalink,thumbnail_url,username,caption,timestamp";
const ACCESS_TOKEN =
  "IGQVJVWm9QRUdDXzhKV25mMkNRQXd5ZA3ozRkhwR2R3cmNZATDBGWEFVSU9rX0drMktTYVFfaGN3NzdPWHFnZAUE1djJVdFNISVhLSzRjNXlhamhqLUlDU0pTWU1RWTF1OFh3aFpKQ1hR";

async function getDatafromInsta() {
  try {
    const {
      data: { data },
    } = await axios({
      url: `https://graph.instagram.com/17841402231174512/media?fields=${FIELDS}&access_token=${ACCESS_TOKEN}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

function Home({ myPosts, addToDo }) {
  // const [postId, setPostId] = useState(null);
  const { data: posts, error, isLoading } = useAsync({
    promiseFn: getDatafromInsta,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!posts) return <div>포스팅이 없습니다!!!</div>;

  function generate() {
    const today = moment();
    const startWeek = today.clone().startOf("month").week();
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Grid key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(i, "day");

              let backgroundColor = "#dff9fb";
              if (today.format("YYYYMMDD") === current.format("YYYYMMDD")) {
                // 오늘
                backgroundColor = "#74b9ff";
              } else if (current.format("MM") !== today.format("MM")) {
                // 다른달
                backgroundColor = "#d2dae2";
              }

              return (
                <ItemDate key={current.format("D")} color={backgroundColor}>
                  <div>
                    <span className={`text`}>{current.format("D")}</span>
                  </div>
                </ItemDate>
              );
            })}
        </Grid>
      );
    }
    return calendar;
  }

  function calendarDate() {
    let sundayFlag = false;
    let temp = [];

    return temp.map((date) => {
      let colorValue = "#1e272e";
      let smallImgSrc =
        "https://ww.namu.la/s/5943bd5b0243cc2c5f1bdf39e2f5019d611cafabf5953427e7654a6d2fa960c1e2543b0de435d7809a80b00d436f1f0e3ee09507c210d21262520ef1118a04c8a87cc4d5d9c0712e7a75f04c17697bacc8496b9c5e122d19847b05e91aaf62b500885fbb78c67d3fa0e6a9dea7236e83";

      // 해당날짜 이미지 불러오기
      if (date.date < posts.length + 1) {
        const index = date.date - 1;
        smallImgSrc = posts[index].media_url;
        if (posts[index].media_type === "VIDEO") {
          smallImgSrc = posts[index].thumbnail_url;
        }
      }

      // 일 ~ 토 날짜 계산
      if (date.id === 1 || sundayFlag === true) {
        colorValue = "#f53b57";
        sundayFlag = false;
      } else if (date.id % 7 === 0) {
        colorValue = "#3c40c6";
        sundayFlag = true;
      }

      return (
        <ItemDate key={date.id}>
          <div>
            <font color={colorValue}>{date.date}</font>
          </div>
          <SmallImage src={smallImgSrc}></SmallImage>
        </ItemDate>
      );
    });
  }

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
        <Image src={tny1}></Image>
        <h3>내 이름은 '이나윤'입니다~~ :D</h3>
      </Header>
      <Main>
        <h2>나윤's 달력</h2>
        <h4>❮ {moment().format("MMMM YYYY")} ❯</h4>
        <Grid>
          <Item>일</Item>
          <Item>월</Item>
          <Item>화</Item>
          <Item>수</Item>
          <Item>목</Item>
          <Item>금</Item>
          <Item>토</Item>
        </Grid>
        {generate()}
      </Main>
      <Footer>
        <h6>Copyright (c) 2020 Nayoon. All Rights Reserved.</h6>
      </Footer>

      {/* <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>추가</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul> */}
    </Container>
  );
}

function mapStateToProps(state) {
  return { myPosts: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from "react";
import { connect } from "react-redux";
import { add } from "../store";
// import ToDo from "../components/ToDo";
import styled from "styled-components";
import tny1 from "../imgs/tny-1.jpeg";

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
  width: 200px;
  height: 150px;
  margin-bottom: 15px;
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
  background-color: #dff9fb;
  height: 100px;
`;

function Home({ toDos, addToDo }) {
  var sundayFlag = false;
  const dateList = {
    id: [],
    date: [],
  };
  for (var i = 1; i < 32; i++) {
    dateList.id[i] = i;
  }

  return (
    <Container>
      <Header>
        <h1>나윤's 홈페이지!!</h1>
        <Image src={tny1}></Image>
        <h3>내 이름은 '이나윤'입니다~~ :D</h3>
      </Header>
      <Main>
        <h1>나윤's 달력</h1>
        <Grid>
          <Item>일</Item>
          <Item>월</Item>
          <Item>화</Item>
          <Item>수</Item>
          <Item>목</Item>
          <Item>금</Item>
          <Item>토</Item>
          {dateList.id.map((date) => {
            var colorValue = "#1e272e";
            if (date === 1 || sundayFlag === true) {
              colorValue = "#f53b57";
              sundayFlag = false;
            } else if (date % 7 === 0) {
              colorValue = "#3c40c6";
              sundayFlag = true;
            }
            return (
              <ItemDate key={date}>
                <font color={colorValue}>{date}</font>
              </ItemDate>
            );
          })}
        </Grid>
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
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// import React, { useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { add } from "../store";
// import ToDo from "../components/ToDo";
import styled from "styled-components";
import tny1 from "../imgs/tny-1.png";
import axios from "axios";
import { useAsync } from "react-async";
import dotenv from "dotenv";
import Calendar from "../components/Calendar";
dotenv.config();

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

async function getDatafromInsta() {
  try {
    const {
      data: { data },
    } = await axios({
      url: `https://graph.instagram.com/17841402231174512/media?fields=${process.env.REACT_APP_FIELDS}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

function Home({ myPosts, addToDo }) {
  // const [postId, setPostId] = useState(null);
  // const { data: posts, error, isLoading } = useAsync({
  //   promiseFn: getDatafromInsta,
  // });

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
          나윤's 홈페이지{" "}
          <span role="img" aria-label="">
            ♥️
          </span>
        </h1>
        <Image src={tny1}></Image>
        <h3>내 이름은 '이나윤'입니다~~ :D</h3>
      </Header>
      <Main>
        <Calendar></Calendar>
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

// function mapStateToProps(state) {
//   return { myPosts: state };
// }

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
}

export default connect(null, mapDispatchToProps)(Home);

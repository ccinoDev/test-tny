import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 200px;
  height: 250px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  margin: 20px 0px;
`;

function Detail({ location: { state }, date }) {
  return (
    <>
      <Link to={`/diary`}>
        <button>
          <span roll="img">⬅</span>
        </button>
      </Link>
      <h2> </h2>
      <h1>
        {date.format("M")}월 {date.format("D")}일
      </h1>
      <Image bgUrl={state.insData && state.insData[0].media_url}></Image>
      <h5>Created at: {state.insData && state.insData[0].timestamp}</h5>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { date: state.date, id: id };
}

export default connect(mapStateToProps)(Detail);

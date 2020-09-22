import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Detail({ date, id }) {
  return (
    <>
      <Link to={`/`}>
        <button>
          <span roll="img">⬅</span>
        </button>
      </Link>
      <h2> </h2>
      <h1>
        {date.format("M")}월 {date.format("D")}일
      </h1>
      <h5>Created at: {id}</h5>
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

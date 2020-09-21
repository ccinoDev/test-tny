import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { add } from "../store";

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
    color: ${(props) => props.color || "#f53b57"};
  }
  &:nth-child(7) {
    color: ${(props) => props.color || "#3c40c6"};
  }
`;

const ItemDate = styled(Item)`
  background: ${(props) => props.backColor || "#dff9fb"};
  color: ${(props) => props.color || "#2d3436"};
  height: 100px;
  &:hover {
    color: #00b894;
  }
`;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function Calendar({ addDay }) {
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

              let backColor = "#dff9fb";
              let color = "#2d3436";
              if (today.format("YYYYMMDD") === current.format("YYYYMMDD")) {
                // 오늘
                backColor = "#74b9ff";
              } else if (current.format("MM") !== today.format("MM")) {
                // 다른달
                backColor = "#d2dae2";
                color = "#636e72";
              } else if (i === 0) {
                // 다른달 일요일
                color = "#f53b57";
              } else if (i === 6) {
                // 다른달 토요일
                color = "#3c40c6";
              }

              const dayData = {
                text: current.format("D"),
                id: current.format("YYMMDD"),
              };

              //addDay(dayData);
              //sleep(100);

              return (
                <Link to={`/${dayData.id}`} key={dayData.id}>
                  <ItemDate
                    key={current.format("D")}
                    backColor={backColor}
                    color={color}
                  >
                    <span>{current.format("D")}</span>
                  </ItemDate>
                </Link>
              );
            })}
        </Grid>
      );
    }
    return calendar;
  }

  return (
    <>
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
    </>
  );
}

function mapStateToProps(state) {
  return { days: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addDay: (payload) => dispatch(add(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Calendar);

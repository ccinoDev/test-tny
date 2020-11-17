import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const MonthContainer = styled.div`
  width: 600px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Grid = styled.div`
  width: 600px;
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
  height: 80px;
  &:hover {
    color: #00b894;
  }
`;

function Calendar(props) {
  function generate() {
    const today = moment();
    const startWeek = props.date.clone().startOf("month").week();
    const endWeek =
      props.date.clone().endOf("month").week() === 1
        ? 53
        : props.date.clone().endOf("month").week();

    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Grid key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = props.date
                .clone()
                .week(week)
                .startOf("week")
                .add(i, "day");

              let backColor = "#dff9fb";
              let color = "#2d3436";
              if (today.format("YYYYMMDD") === current.format("YYYYMMDD")) {
                // 오늘
                backColor = "#74b9ff";
              } else if (current.format("MM") !== props.date.format("MM")) {
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

              const dayInfo = {
                day: current.format("D"),
                id: current.format("YYYYMMDD"),
              };

              return (
                <Link to={`/${dayInfo.id}`} key={dayInfo.id}>
                  <ItemDate
                    key={dayInfo.day}
                    backColor={backColor}
                    color={color}
                    onClick={() => props.changeDate(current)}
                  >
                    <span>{dayInfo.day}</span>
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
      <h3>나윤's 달력</h3>
      <MonthContainer>
        <button
          onClick={() =>
            props.changeDate(props.date.clone().subtract(1, "month"))
          }
        >
          ❮❮
        </button>
        <a href=" ">
          <h4 onClick={() => props.changeDate(moment())}>
            {props.date.format("MMMM YYYY")}{" "}
          </h4>
        </a>
        <button
          onClick={() => props.changeDate(props.date.clone().add(1, "month"))}
        >
          ❯❯
        </button>
      </MonthContainer>
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

export default Calendar;

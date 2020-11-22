import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeDate } from "../store";
import styled from "styled-components";
import { instaApi } from "../api";
import dotenv from "dotenv";
import Calendar from "../Components/Calendar";
import Loader from "../Components/Loader";
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

const INS_FIELDS =
  "id,media_type,media_url,permalink,thumbnail_url,username,caption,timestamp";
const INS_TOKEN =
  "IGQVJWeFZAUZAk9peFEzN2RVXzc0b1JSeWxYeGExRnZAUVmJpdmlxM2dRelFiVmVHUG9KU0J2dm45Szdlcy1tWk1BVXZANRmd2Q2Vrbl9ZAYzNtRnVPaXMtNWEwVTZAxUnBQRDdvVEx1WHY5TFNsbUZAwOXM3VEZAsc3lHTjFacXA0";
const USER_ID = "17841407527791364";

// "https://api.instagram.com/oauth/authorize?client_id=2634490610102589&redirect_uri=https://nayoon.netlify.app/auth&scope=user_profile,user_media&response_type=code"

// "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=fee8be5fbdac490dd886607f22928b96&access_token=IGQVJWbDIxenlOS2lJZAERCTVQ5V2tfMW1TbmFia281VC00OFZAyNGVzV2R1eXFacjNHOHM0dV9QSW5QZAjBPUFZAyaHl5cWtwRkpMWTVMWk5RdTNRQjFySk9sdjlLRGFCdW1LbExVSm94azBqT3lHcmdScEpiWml0Tk1ZAdVBv"

const Diary = ({ date, changeDate }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [posts, setPosts] = useState();

  const getDatafromInsta = async () => {
    try {
      const {
        data: { data: result },
      } = await instaApi.getMedia(USER_ID, INS_FIELDS, INS_TOKEN);
      setPosts(result);
    } catch (e) {
      console.log("error:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatafromInsta();
  }, []);

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
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
            <Calendar
              posts={posts}
              date={date}
              changeDate={changeDate}
            ></Calendar>
          </Main>
          <Footer>
            <h6>Copyright (c) 2020 Nayoon. All Rights Reserved.</h6>
          </Footer>
        </Container>
      )}
    </>
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

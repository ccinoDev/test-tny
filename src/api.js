import axios from "axios";

// const INS_FIELDS =
//   "id,media_type,media_url,permalink,thumbnail_url,username,caption,timestamp";
// const INS_TOKEN =
//   "IGQVJXZAlNNc3JtSDdQNEM0WlNNc0otcTFlYkxoWXd6eWdLSzcwRWg3VTR6U1ZAsa2JfalA0S25DajluVkdjVy0tbmplMmtLZAzhMQzBPSUUwRndnU2F6VmRXOW55QjRtZAGJtUjFkMy1YZAUl0QW1PMjZALclowaVdBVjBoWlZAr";
// const USER_ID = "17841407527791364";

const authApi = axios.create({
  baseURL: "https://api.instagram.com/oauth/",
  params: {
    client_id: "2634490610102589",
    redirect_uri: "https://nayoon.netlify.app/auth",
  },
});

const mediaApi = axios.create({
  baseURL: "https://graph.instagram.com/",
});

export const instaApi = {
  getAuth: () =>
    authApi.get("authorize", {
      params: {
        scope: "user_profile,user_media",
        response_type: "code",
      },
    }),
  postAuthCode: (code) =>
    authApi.post("access_token", {
      params: {
        client_secret: "ac1143cd4fae41822eaed8c7b966cb5a",
        grant_type: "authorization_code",
        code: code,
      },
    }),
  getMedia: (id, insFields, insToken) =>
    mediaApi.get(`${id}`, {
      params: {
        media: `fields=${insFields}`,
        access_token: insToken,
      },
    }),
};

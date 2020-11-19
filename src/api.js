import axios from "axios";

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
  getMedia: (id, insFields, insToken) =>
    mediaApi.get(`${id}/media`, {
      params: {
        fields: insFields,
        access_token: insToken,
      },
    }),
};

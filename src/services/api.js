import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT_POPULAR = "/trending/movie/day";
const END_POINT_SEARCH = "/search/movie";
const END_POINT_ID = "/movie/";
const END_POINT_CREDITS = "/credits";
const END_POINT_REVIEWS = "/reviews";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzczMzYzNmQwYThiMTA0YzFmYWE4OWI5ODI5MTc0YSIsIm5iZiI6MTcyMjM4NzYzNS44NzQzNzEsInN1YiI6IjY2NjU5ZGU2ZTcxMDM0MDEwZmJlNTc3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nrHwIfJa26MXl28UIGvCAFzASBPwtlD5m3j3jMYtL4Y",
  },
  params: {
    query: "",
    page: 1,
  },
};

export const popularFilms = async () => {
  const url = `${BASE_URL}${END_POINT_POPULAR}`;
  const res = await axios.get(url, options);
  return res.data.results;
};

export const searchFilms = async (value) => {
  const url = `${BASE_URL}${END_POINT_SEARCH}`;
  const { data } = await axios.get(url, {
    ...options,
    params: { query: value },
  });
  return data.results;
};

export const detailsFilms = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}`;
  const res = await axios.get(url, options);
  return res.data;
};

export const castsFilm = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}${END_POINT_CREDITS}`;
  const res = await axios.get(url, options);
  return res.data.cast;
};

export const reviewsFilm = async (id) => {
  const url = `${BASE_URL}${END_POINT_ID}${id}${END_POINT_REVIEWS}`;
  const res = await axios.get(url, options);
  return res.data.results;
};

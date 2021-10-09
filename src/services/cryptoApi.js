import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = "8d460f8ef4msha149c58b6ca1fd9p1cbc49jsnce423baa386e";
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": API_KEY,
};
const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStats: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
  }),
});
export const {
  useGetStatsQuery,
  useGetDetailsQuery,
  useGetCoinHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "8d460f8ef4msha149c58b6ca1fd9p1cbc49jsnce423baa386e",
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createNewsRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsAPi = createApi({
  reducerPath: "cryptoNewsAPi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createNewsRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});
export const { useGetCryptoNewsQuery } = cryptoNewsAPi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeader = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => {
  return {
    url,
    headers: cryptoApiHeader,
  };
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ id, timeperiod }) => createRequest(`coin/${id}/history?timeperiod=${timeperiod}`),
    }),
  }),
});

// redux toolkit creates a hook that can be called instantly to
// get all data for your query
export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;

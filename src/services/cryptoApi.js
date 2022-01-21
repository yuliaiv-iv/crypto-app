import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeader = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

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
      query: ({ id, timeperiod }) =>
        createRequest(`coin/${id}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

// redux toolkit creates a hook that can be called instantly to
// get all data for your query
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

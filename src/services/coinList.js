import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'd1c54f25a2msha1dc7a807c1e1bap1657e0jsnab6d9353e6f1',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

export const coinListApi = createApi({
  reducerPath: 'coinListApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: () => ({}),
});

const PAGE_SIZE = 12;

coinListApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (pageNumber) => (
        {
          url: '/coins',
          headers: cryptoApiHeaders,
          params: { limit: PAGE_SIZE, offset: pageNumber * PAGE_SIZE }
        }
      ),
      transformResponse: (response, meta, arg) => response.data.coins,
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          // console.log(response);
        } catch(err) {
          console.log('failed!', err);
        }
      },
      serializeQueryArgs: ({ endpointName }) => endpointName, // cache key is common across all arguments, 
      // since we are appending data, and not re-writing the entire thing
      merge: (currentCache, newCoins) => { // appending new data to the existing cache
        currentCache.push(...newCoins);
      },
      forceRefetch: ({currentArg, previousArg}) => (currentArg !== previousArg),  // refetch when current page is not equal to previous
    }),
    getCoinData: builder.query({
      query: (coinId) => ({
        url: `/coin/${coinId}`,
        headers: cryptoApiHeaders,
      }),
      transformResponse: (response) => response.data.coin,
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          // console.log(response);
        } catch(err) {
          console.log('failed!', err);
        }
      },
    })
  }),
});

export const { useGetCoinsQuery, useGetCoinDataQuery, usePrefetch } = coinListApi;
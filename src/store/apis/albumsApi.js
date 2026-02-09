import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (id) => {
          return {
            url: "/albums",
            params: {
              userId: id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export { albumsApi };
export const { useFetchAlbumsQuery } = albumsApi;

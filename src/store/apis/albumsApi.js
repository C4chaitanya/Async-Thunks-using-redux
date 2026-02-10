import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return {
              type: "Album",
              id: album.id,
            };
          });
          tags.push({
            type: "UserAlbums",
            id: user,
          });
          return tags;
        },
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
      createAlbum: builder.mutation({
        invalidatesTags: (result, error, userId) => {
          return [
            {
              type: "UserAlbums",
              id: userId,
            },
          ];
        },
        query: (id) => {
          return {
            url: "/albums",
            body: {
              userId: id,
              name: faker.commerce.productName(),
            },
            method: "POST",
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [
            {
              type: "Album",
              id: album.id,
            },
          ];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export { albumsApi };
export const {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;

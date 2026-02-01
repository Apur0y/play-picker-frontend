import { baseUrlApi } from "@/redux/features/baseUrlApi";

export const packagesApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllSports: builder.query({
      query: () => "/sports",
      providesTags: ["Sports"],
    }),


    getSportsById: builder.query({
      query: (id) => `/sports/${id}`,
    }),


    createSport: builder.mutation({
      query: (body) => ({
        url: "/sports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sports"],
    }),

    // ✅ UPDATE package
    updateSports: builder.mutation({
      query: ({ id, body }) => ({
        url: `/sports/${id}`,
        method: "PUT",
        body,
      }),
       invalidatesTags: ["Sports"]
    }),

    // ✅ DELETE package
    deleteSports: builder.mutation({
      query: (id) => ({
        url: `/sports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sports"],
    }),


  }),
});

export const {
  useGetAllSportsQuery,
  useCreateSportMutation,
  useDeleteSportsMutation,
  useUpdateSportsMutation,
  useGetSportsByIdQuery
 
} = packagesApi;

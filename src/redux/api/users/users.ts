import { baseUrlApi } from "@/redux/features/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET"
      }),
      providesTags:["user"]
    }),
    createuser: build.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    })

  }),
});

export const {
  useCreateuserMutation,
  useGetMeQuery,
} = authApi;

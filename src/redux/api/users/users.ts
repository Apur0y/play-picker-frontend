import { baseUrlApi } from "@/redux/features/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET"
      }),
      providesTags:["user"]
    }),
    signUp: build.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags:["user"]
    }),

    // signIn
    signIn: build.mutation({
      query: (signInUserData) => ({
        url: "/user/login",
        method: "POST",
        body: signInUserData,
      }),
       invalidatesTags:["user"]
    }),

  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetMeQuery,
  useLogoutMutation
} = authApi;

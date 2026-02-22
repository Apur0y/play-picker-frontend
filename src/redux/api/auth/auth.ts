import { baseUrlApi } from "@/redux/features/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({

    // 🔐 Login
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "user"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      }),
      invalidatesTags: ["Auth", "user"],
    }),

    // 🔐 Google Login
    googleLogin: build.mutation({
      query: (tokenData) => ({
        url: "/auth/google-login",
        method: "POST",
        body: tokenData,
      }),
      invalidatesTags: ["Auth", "user"],
    }),

    // 👤 Get Logged-in User
    getMe: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // 🔄 Refresh Token
    refreshToken: build.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),

    // 🔎 Validate Session
    validateSession: build.query({
      query: () => ({
        url: "/auth/validate-session",
        method: "GET",
      }),
    }),

    // 🔑 Change Password
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: passwordData,
      }),
    }),

    // 📩 Forgot Password
    forgotPassword: build.mutation({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    // 🔁 Reset Password
    resetPassword: build.mutation({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),

    // 📧 Verify Email
    verifyEmail: build.query({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "GET",
      }),
    }),

    // 🔐 Verify Reset Password Link
    verifyResetPassword: build.query({
      query: (token) => ({
        url: `/auth/verify-reset-password?token=${token}`,
        method: "GET",
      }),
    }),

    // 🔁 Resend Verification Email
    resendVerificationLink: build.mutation({
      query: (emailData) => ({
        url: "/auth/resend-verification-link",
        method: "POST",
        body: emailData,
      }),
    }),

    // 🔁 Resend Reset Password Link
    resendResetPassLink: build.mutation({
      query: (emailData) => ({
        url: "/auth/resend-reset-pass-link",
        method: "POST",
        body: emailData,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
  useValidateSessionQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useVerifyResetPasswordQuery,
  useResendVerificationLinkMutation,
  useResendResetPassLinkMutation,
} = authApi;
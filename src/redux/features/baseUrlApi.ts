import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';


// initialize an empty api service that we'll inject endpoints into later as needed
export const baseUrlApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_PLAY_SERVER_URL}api/v1`,
     prepareHeaders: (headers) => {
      // const token  = localStorage.getItem("accessToken")
      const token  = Cookies.get("accessToken")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials:"include"
   }),
  endpoints: () => ({}),
  tagTypes:["user","Sports", "Auth"]
});

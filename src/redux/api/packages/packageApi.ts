import { baseUrlApi } from "@/redux/features/baseUrlApi";

const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPackages: build.query({
      query: () => ({
        url: "/packages",
        method: "GET",
      }),
    }),

    // signIn
    createTour: build.mutation({
      query: (tourData) => ({
        url: "/tours/create",
        method: "POST",
        body: tourData,
      }),
    }),
    updateTour: build.mutation({
      query: ({ id, tourData }: { id: string; tourData: unknown }) => ({
        url: `/tours/update/${id}`,
        method: "PATCH",
        body: tourData,
      }),
    }),
    deleteTour: build.mutation({
      query: (id) => ({
        url: `/tours/update/${id}`,
        method: "DELETE",

      }),
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useCreateTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation
} = authApi;

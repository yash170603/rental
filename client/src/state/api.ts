import { createNewUserInDatabase, withToast } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [
    "Managers",
    "Tenants",
    "Properties",
    "PropertyDetails",
    "Leases",
    "Payments",
    "Applications",
  ],
  
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      // <user,void> is the type of the response and the type of the query arguement both in regards from and to backend
      queryFn: async (_, _queryApi, _extraoptions, fetchwithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {}; // look into what is this ??{} method of preventing ts error of null/undefined
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;

          const endpoint =
            userRole === "manager"
              ? `/manager/${user.userId}`
              : `/tenants/${user.userId}`;
          console.log("this is the endpoint", endpoint);
          let userDetailsResponse = await fetchwithBQ(endpoint);
          console.log("this is the usedetails at line 36", userDetailsResponse);
          // if user doesnt exists create neww user
          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchwithBQ
            );
          }

          // if user is not the
          // re. then create a new one

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole,
            },
          };
        } catch (error: any) {
          return {
            error: error.message || "Could not fetch user details!",
          };
        }
      },
    }),

    updateTenantSettings: build.mutation<Tenant,{ cognitoId: string } & Partial<Tenant>>({
    query: ({ cognitoId, ...updatedTenant }) => ({
      url: `tenants/${cognitoId}`,
      method: "PUT",
      body: updatedTenant,
    }),
    invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }],
    async onQueryStarted(_, { queryFulfilled }) { //This is a lifecycle method that fires when the mutation starts.  queryFulfilled is a promise that resolves when the mutation finishes.
      await withToast(queryFulfilled, {
        success: "Settings updated successfully!",
        error: "Failed to update settings.",
      });
    },
  }),

  updateManagerSettings: build.mutation< Manager,{ cognitoId: string } & Partial<Manager>>({
  query: ({ cognitoId, ...updatedManager }) => ({
    url: `managers/${cognitoId}`,
    method: "PUT",
    body: updatedManager,
  }),
  invalidatesTags: (result) => [{ type: "Managers", id: result?.id }],
  async onQueryStarted(_, { queryFulfilled }) {
    await withToast(queryFulfilled, {
      success: "Settings updated successfully!",
      error: "Failed to update settings.",
    });
  },
}),

  }),
});

export const { useGetAuthUserQuery,useUpdateTenantSettingsMutation , useUpdateManagerSettingsMutation} = api;

// this is how the payload would loook like of rhte auth one
// {
//   "username": "johndoe@example.com",
//   "password": "SuperSecurePassword123!",
//   "attributes": {
//     "email": "johndoe@example.com",
//     "custom:role": "tenant",
//     "given_name": "John",
//     "family_name": "Doe"
//   }
// }

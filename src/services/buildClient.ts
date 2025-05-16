// import fetch from 'node-fetch';
//   import {
//     ClientBuilder,
//     type AuthMiddlewareOptions,
//     type HttpMiddlewareOptions,
//   } from '@commercetools/sdk-client-v2';

//   // Configure authMiddlewareOptions
//   const authMiddlewareOptions: AuthMiddlewareOptions = {
//     host: 'https://auth.europe-west1.gcp.commercetools.com',
//     projectKey: 'ultra-ecomm-app',
//     credentials: {
//       clientId: "Q0g660IXFT0hVMMMfy6KI50c",
//       clientSecret: "jyYQzxNalIlA3fshiqRaIA2WzRD-j4lH",
//     },
//     scopes: ['create_anonymous_token:ultra-ecomm-app manage_my_payments:ultra-ecomm-app manage_my_profile:ultra-ecomm-app manage_my_orders:ultra-ecomm-app view_published_products:ultra-ecomm-app manage_my_business_units:ultra-ecomm-app manage_my_quotes:ultra-ecomm-app view_categories:ultra-ecomm-app manage_my_quote_requests:ultra-ecomm-app manage_my_shopping_lists:ultra-ecomm-app'],
//     fetch,
//   };

//   // Configure httpMiddlewareOptions
//   const httpMiddlewareOptions: HttpMiddlewareOptions = {
//     host: 'https://api.europe-west1.gcp.commercetools.com',
//     fetch,
//   };

//   // Export the ClientBuilder
//   export const ctpClient = new ClientBuilder()
//     .withClientCredentialsFlow(authMiddlewareOptions)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withLoggerMiddleware()
//     .build();

import {
  type AuthMiddlewareOptions,
  // type HttpMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// const API_HOST = `${import.meta.env.VITE_API_HOST}`;
const AUTH_HOST = `${import.meta.env.VITE_AUTH_HOST}`;
const PROJECT_KEY = `${import.meta.env.VITE_PROJECT_KEY}`;
const CREDENTIALS = {
  clientId: `${import.meta.env.VITE_CLIENT_ID}`,
  clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
};
const SCOPES = ['create_anonymous_token:ultra-ecomm-app'];

const authOptions: AuthMiddlewareOptions = {
  host: `${AUTH_HOST}`,
  projectKey: `${PROJECT_KEY}`,
  credentials: CREDENTIALS,
  scopes: SCOPES,
  httpClient: fetch,
};

// const httpOptions: HttpMiddlewareOptions = {
//   host: `${API_HOST}`,
//   httpClient: fetch
// }

const client = new ClientBuilder()
  // .withClientCredentialsFlow(authOptions)
  // .withHttpMiddleware(httpOptions)
  .withAnonymousSessionFlow(authOptions)
  .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});

export const getProject = () => apiRoot.products().get().execute();

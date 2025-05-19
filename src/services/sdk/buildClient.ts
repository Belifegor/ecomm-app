// import {
//   type AuthMiddlewareOptions,
//   type HttpMiddlewareOptions,
//   ClientBuilder,
// } from '@commercetools/ts-client';
//
// export const PROJECT_KEY = `${import.meta.env.VITE_PROJECT_KEY}`;
// const API_HOST = `${import.meta.env.VITE_API_HOST}`;
// const AUTH_HOST = `${import.meta.env.VITE_AUTH_HOST}`;
// const CREDENTIALS = {
//   clientId: `${import.meta.env.VITE_CLIENT_ID}`,
//   clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
// };
// const SCOPES = [`${import.meta.env.VITE_SCOPE}`];
//
// const authOptions: AuthMiddlewareOptions = {
//   host: `${AUTH_HOST}`,
//   projectKey: `${PROJECT_KEY}`,
//   credentials: CREDENTIALS,
//   scopes: SCOPES,
//   httpClient: fetch,
// };
//
// const httpOptions: HttpMiddlewareOptions = {
//   host: `${API_HOST}`,
//   httpClient: fetch,
// };
//
// export const client = new ClientBuilder()
//   .withClientCredentialsFlow(authOptions)
//   .withHttpMiddleware(httpOptions)
//   .withAnonymousSessionFlow(authOptions)
//   .build();

//import { createAuthForAnonymousSessionFlow, type TokenStore } from '@commercetools/sdk-client-v2';
// import { createAuthForAnonymousSessionFlow, TokenStore  } from '@commercetools/sdk-client-v2'

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { LoginData } from '../../pages/LoginPage.tsx';
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
const AUTH_HOST = import.meta.env.VITE_CT_AUTH_HOST;
const API_HOST = import.meta.env.VITE_CT_API_HOST;
const API_SCOPES = import.meta.env.VITE_API_SCOPES;

import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  type PasswordAuthMiddlewareOptions, //
} from '@commercetools/ts-client';

const projectKey = PROJECT_KEY;
const scopes = API_SCOPES;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_HOST,
  projectKey: projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  httpClient: fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_HOST,
  httpClient: fetch,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [500, 503],
  },
};

export const anonymousClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(
  anonymousClient
).withProjectKey({ projectKey: PROJECT_KEY });

export function getCustomerToken(formData: LoginData) {
  const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: AUTH_HOST,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: formData.email,
        password: formData.password,
      },
    },
    scopes,
    httpClient: fetch,
  };
  console.log('xxxxx');
  const passwordFlowClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(passwordFlowClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

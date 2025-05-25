import { LoginData } from '../../pages/LoginPage.tsx';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  API_SCOPES,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  httpMiddlewareOptions,
  PROJECT_KEY,
} from './BuildClient.ts';

export async function getCustomerToken(formData: LoginData) {
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
    scopes: API_SCOPES,
    httpClient: fetch,
  };
  console.log('xxxxx');
  const passwordFlowClient = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow(passwordMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    passwordFlowClient
  ).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const result = await apiRoot.me().login().post({ body: formData }).execute();
  console.log(result);
  return result.body.customer;
}

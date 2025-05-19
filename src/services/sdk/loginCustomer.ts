// import { apiRoot } from './apiRoot';
// import type {
//   CustomerSignInResult,
//   CustomerSignin,
// } from '@commercetools/platform-sdk';
//
// export async function loginCustomer(
//   credentinals: CustomerSignin
// ): Promise<CustomerSignInResult> {
//
//   const response = await apiRoot
//     .me()
//     .login()
//     .post({ body: credentinals })
//     .execute();
//
//   return response.body;
// }
import { LoginData } from '../../pages/LoginPage.tsx';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  PROJECT_KEY,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  API_SCOPES,
} from '../CommerceTools/BuildClient.ts';
import { httpMiddlewareOptions } from '../CommerceTools/BuildClient.ts';

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
    scopes: API_SCOPES,
    httpClient: fetch,
  };
  console.log('xxxxx');
  const passwordFlowClient = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow(passwordMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(passwordFlowClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

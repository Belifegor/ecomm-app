import { LoginData } from '../../pages/LoginPage.tsx';
import { getCreateAnonymousId } from '../../utils/getCreateAnonymousId';
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
  apiRoot,
} from './BuildClient.ts';
import type { MyCustomerSigninExtended } from '../../types/MyCustomerSigninExtended.ts';
import { useCartStore } from '../../store/cartStore';

export function createApiRoot(formData: LoginData) {
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
export async function getCustomerToken(formData: LoginData) {
  const anonymousId = getCreateAnonymousId();
  const anonCart = await apiRoot
    .me()
    .activeCart()
    .get()
    .execute()
    .then((res) => res.body)
    .catch(() => null);

  const loginBody: MyCustomerSigninExtended = {
    email: formData.email,
    password: formData.password,
    anonymousId,
  };

  const customerApiRoot = createApiRoot(formData);

  const result = await customerApiRoot
    .me()
    .login()
    .post({ body: loginBody })
    .execute();

  localStorage.removeItem('ct_anonymous_id');

  const customer = result.body.customer;

  if (anonCart?.id) {
    try {
      const replicateResult = await customerApiRoot
        .carts()
        .replicate()
        .post({
          body: {
            reference: {
              typeId: 'cart',
              id: anonCart.id,
            },
          },
        })
        .execute();

      const newCart = replicateResult.body;
      useCartStore.getState().setCartId(newCart.id, newCart.version);
      console.log('[replicate] migrated anonymous cart to customer');
    } catch (e) {
      console.warn('[replicate] failed to migrate anonymous cart:', e);
    }
  } else if (result.body.cart) {
    useCartStore
      .getState()
      .setCartId(result.body.cart.id, result.body.cart.version);
  }

  return customer;
}

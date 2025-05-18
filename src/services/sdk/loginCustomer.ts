import { apiRoot } from './apiRoot';
import type {
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';

export async function loginCustomer(
  credentinals: CustomerSignin
): Promise<CustomerSignInResult> {
  const response = await apiRoot
    .me()
    .login()
    .post({ body: credentinals })
    .execute();

  return response.body;
}

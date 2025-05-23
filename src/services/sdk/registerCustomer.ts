import { apiRoot } from './apiRoot';
import type {
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';

export async function registerCutomer(
  customerData: MyCustomerDraft
): Promise<CustomerSignInResult> {
  const response = await apiRoot
    .me()
    .signup()
    .post({
      body: customerData,
    })
    .execute();

  return response.body;
}

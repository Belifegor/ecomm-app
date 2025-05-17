import { apiRoot } from './apiRoot';
import type {
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

export async function registerCutomer(
  customerData: CustomerDraft
): Promise<CustomerSignInResult> {
  const response = await apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();

  return response.body;
}

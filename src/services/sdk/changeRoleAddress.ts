import { authStore } from '../../store/store.ts';
import { Address } from '@commercetools/platform-sdk';
import { createApiRoot } from './loginCustomer.ts';

export type AddressAction =
  | 'setDefaultShippingAddress'
  | 'setDefaultBillingAddress'
  | 'removeAddress';

interface AddressActionInput {
  address: Address;
  action: AddressAction;
}

// export async function changeRoleAddress(
//   address: Address,
//   action: AddressAction
// ): Promise<void> {
//   const { customer, userOptions } = authStore.getState();
//   if (!customer || !userOptions) return;
//   const addressID = address.id;
//   const { version } = customer;
//   try {
//     const res = await createApiRoot({
//       email: userOptions.userName,
//       password: userOptions.password,
//     })
//       .me()
//       .post({
//         body: {
//           version,
//           actions: [
//             {
//               action: action,
//               addressId: addressID,
//             },
//           ],
//         },
//       })
//       .execute();
//     if (res.statusCode === 200) {
//       console.log(11111111111111);
//       const updatedCustomer = res.body;
//       authStore.getState().updateCustomer(updatedCustomer);
//       console.log(authStore.getState().customer);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     } else {
//       console.error('Unknown error', error);
//     }
//   }
// }
export async function updateCustomerAddress({
  address,
  action,
}: AddressActionInput): Promise<void> {
  const { customer, userOptions } = authStore.getState();

  if (!customer || !userOptions) return;

  const addressId = address.id;
  const { version } = customer;
  console.log(address.id);
  try {
    const res = await createApiRoot({
      email: userOptions.userName,
      password: userOptions.password,
    })
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action,
              addressId,
            },
          ],
        },
      })
      .execute();

    if (res.statusCode === 200) {
      const updatedCustomer = res.body;
      authStore.getState().updateCustomer(updatedCustomer);
      console.log('Customer updated:', updatedCustomer);
    }
  } catch (error) {
    console.error('Update address error:', error);
  }
}

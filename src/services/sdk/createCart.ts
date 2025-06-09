import { apiRoot } from './apiRoot.ts';

export const createCart = async () => {
  return apiRoot
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute();
};

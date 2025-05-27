import { apiRoot } from '../CommerceTools/BuildClient';

export async function getProducts() {
  const response = await apiRoot
    .productProjections()
    .get({ queryArgs: { limit: 10 } })
    .execute();

  console.log('Get product projections from GetProducts', response);
  return response.body.results;
}

import { apiRoot } from '../CommerceTools/BuildClient';

export async function getProducts() {
  const response = await apiRoot
    .productProjections()
    .get({ queryArgs: { limit: 10 } })
    .execute();
  return response.body.results;
}

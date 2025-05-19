import { apiRoot } from './apiRoot';

export async function getProducts() {
  const response = await apiRoot.productProjections().get().execute();

  return response.body.results;
}

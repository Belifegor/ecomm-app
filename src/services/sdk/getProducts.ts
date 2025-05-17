import { apiRoot } from './apiRoot';

export function getProducts() {
  const response = apiRoot.productProjections().get().execute();

  return response;
}

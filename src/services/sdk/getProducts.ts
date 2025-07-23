import { apiRoot } from '../sdk/BuildClient';

export async function getProducts(limit: number = 10) {
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        localeProjection: 'en-US',
        sort: 'name.en-US dsc',
      },
    })
    .execute();

  return response.body.results;
}

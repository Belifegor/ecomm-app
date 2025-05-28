import { apiRoot } from './BuildClient.ts';

export function getAnToken() {
  apiRoot
    .productProjections()
    .get({ queryArgs: { staged: false } })
    .execute()
    .then((response) => {
      console.log('Published product projections:', response.body.results);
      console.log(response.headers);
    })
    .catch(console.error);
}

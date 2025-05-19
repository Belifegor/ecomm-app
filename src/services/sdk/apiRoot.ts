import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { /*client,*/ PROJECT_KEY } from './buildClient';

import { anonymousClient, PROJECT_KEY } from '../CommerceTools/BuildClient.ts';

export const apiRoot = createApiBuilderFromCtpClient(
  anonymousClient
).withProjectKey({
  projectKey: PROJECT_KEY,
});

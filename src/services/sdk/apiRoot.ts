import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousClient, PROJECT_KEY } from './BuildClient.ts';
// import { /*client,*/ PROJECT_KEY } from './buildClient';

export const apiRoot = createApiBuilderFromCtpClient(
  anonymousClient
).withProjectKey({
  projectKey: PROJECT_KEY,
});

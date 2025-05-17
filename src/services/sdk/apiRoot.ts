import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client, PROJECT_KEY } from './buildClient';

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});

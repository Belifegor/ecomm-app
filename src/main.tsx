import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { apiRoot } from './services/CommerceTools/BuildClient.ts';
// import {getCustomerToken} from './services/CommerceTools/BuildClient.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// apiRoot.products()
//   .get({ queryArgs: { staged: false } })
//   .execute()
//   .then(response => {
//     console.log('Products:', response.body.results);
//   })
//   .catch(console.error);

apiRoot
  .productProjections()
  .get({ queryArgs: { staged: false } })
  .execute()
  .then((response) => {
    console.log('Published product projections:', response.body.results);
    console.log(response.headers);
  })
  .catch(console.error);

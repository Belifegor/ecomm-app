import { registerCutomer } from '../services/sdk/registerCustomer';
// import { loginCustomer } from '../services/sdk/loginCustomer';
import { NavigateFunction } from 'react-router-dom'; // для навигации на main
import { authStore } from '../store/store';
import { RegistrationData } from '../pages/RegistrationPage.tsx';
import { mapRegistrationData } from '../utils/mapRegistrationData.ts';
import { getCustomerToken } from '../services/sdk/loginCustomer';

export async function registerAction(
  formData: RegistrationData,
  navigate: NavigateFunction
) {
  const mappedData = mapRegistrationData(formData);
  await registerCutomer(mappedData);


  await registerCutomer(mappedData);

  const { email, password } = formData;
  const result = await getCustomerToken({ email, password });
  console.log(result);
  // await loginCustomer({ email, password });
  authStore.getState().login(result);
  navigate('/', { replace: true }); // убрал main в navigate
}

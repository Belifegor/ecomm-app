import { registerCutomer } from '../services/sdk/registerCustomer';
// import { loginCustomer } from '../services/sdk/loginCustomer';
import { authStore } from '../store/store';
import { RegistrationData } from '../pages/RegistrationPage.tsx';
import { mapRegistrationData } from '../utils/mapRegistrationData.ts';
import { getCustomerToken } from '../services/sdk/loginCustomer';

export async function registerAction(formData: RegistrationData) {
  const mappedData = mapRegistrationData(formData);

  try {
    await registerCutomer(mappedData);

    const { email, password } = formData;
    const result = await getCustomerToken({ email, password })
      .me()
      .login()
      .post({ body: { email, password } })
      .execute();
    // await loginCustomer({ email, password });
    authStore.getState().login(result.body.customer);
    console.log(result);
  } catch (error) {
    console.error('Registration failed', error);
    return error;
  }
}

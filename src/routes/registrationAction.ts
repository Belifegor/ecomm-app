import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { registerCutomer } from '../services/sdk/registerCustomer';
import { loginCustomer } from '../services/sdk/loginCustomer';
import { authStore } from '../store/store';

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const firstName = formData.get('name')?.toString() || '';
  const lastName = formData.get('lastName')?.toString() || '';
  const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
  const street = formData.get('street')?.toString() || '';
  const city = formData.get('city')?.toString() || '';
  const postalCode = formData.get('postalCode')?.toString() || '';
  const country = formData.get('country')?.toString() || '';

  try {
    if (
      typeof email === 'string' &&
      typeof password === 'string' &&
      typeof firstName === 'string' &&
      typeof lastName === 'string' &&
      typeof dateOfBirth === 'string' &&
      typeof street === 'string' &&
      typeof city === 'string' &&
      typeof postalCode === 'string' &&
      typeof country === 'string'
    ) {
      await registerCutomer({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        addresses: [
          {
            streetName: street,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        ],
      });

      const result = await loginCustomer({ email, password });
      authStore().login(result.customer);

      return redirect('/main');
    }
  } catch (error) {
    console.error('Registration failed', error);

    return error;
  }
}

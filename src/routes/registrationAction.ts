import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { registerCutomer } from '../services/sdk/registerCustomer';

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    if (typeof email === 'string' && typeof password === 'string') {
      const result = await registerCutomer({ email, password });
      // const result = loginCustomer({ email, password});
      console.log(result.customer);

      return redirect('/main');
    }
  } catch (error) {
    console.error('Registration failed', error);

    return error;
  }
}

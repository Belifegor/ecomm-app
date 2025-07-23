// import { ActionFunctionArgs, redirect } from 'react-router-dom';
// import { loginCustomer } from '../services/sdk/loginCustomer';
// import { authStore } from '../store/store';
//
// export async function loginAction({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const email = formData.get('email');
//   const password = formData.get('password');
//
//   try {
//     if (typeof email === 'string' && typeof password === 'string') {
//       const result = await loginCustomer({ email, password });
//       authStore.getState().login(result.customer);
//
//       return redirect('/main');
//     }
//   } catch (error) {
//     console.error('Login failed', error);
//
//     return error;
//   }
// }

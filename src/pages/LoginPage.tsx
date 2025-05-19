import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { schemaForLogin } from '../utils/validation.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCustomerToken } from '../services/CommerceTools/BuildClient.ts';
//import { useNavigate } from 'react-router-dom'
export type LoginData = z.infer<typeof schemaForLogin>;

function LoginPage() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(schemaForLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const submitHandler = (formData: LoginData) => {
    getCustomerToken(formData)
      .me()
      .get()
      .execute()
      .then((res) => {
        // navigate('/main');
        console.log('Customer info:', res.body);
      })
      .catch((err) => {
        console.error('Login failed:', err.message);
      });
  };
  console.log(isValid);
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT LOGIN</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            register={register}
            label="Email"
            type="text"
            name="email"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.email.message}
            </p>
          )}
          <InputField
            register={register}
            label="Password"
            type="password"
            name="password"
            placeholder="password..."
          />
          {errors.password && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.password.message}
            </p>
          )}
          <Button type="submit" text="Login" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}
export default LoginPage;

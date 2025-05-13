import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
//import { schemaForLogin } from '../utils/validation.ts';
import { schemaForLogin } from '../utils/validation.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type LoginData = z.infer<typeof schemaForLogin>;
function LoginPage() {
  const {
    register,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(schemaForLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // const res = schemaForLogin.safeParse({ register });
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT LOGIN</h2>
        <InputField
          register={register}
          label="Email"
          type="text"
          name="email"
          placeholder="example@example.com"
        />
        {errors.email && (
          <p className="h-8 text-red-500">{errors.email.message}</p>
        )}
        <InputField
          register={register}
          label="Password"
          type="password"
          name="password"
          placeholder="password..."
        />
        {errors.password && (
          <p className="h-8 text-red-500">{errors.password.message}</p>
        )}
        <Button text="Login" />
      </div>
    </div>
  );
}
export default LoginPage;

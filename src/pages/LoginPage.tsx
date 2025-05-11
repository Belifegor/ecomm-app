import { ChangeEvent, useState } from 'react';
import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { schemaForLogin } from '../utils/validation.ts';
import { getErrorMessage } from '../utils/validation.ts';

function LoginPage() {
  const [fields, setValue] = useState<Record<string, string>>({
    email: '',
    password: '',
  });

  const res = schemaForLogin.safeParse({ ...fields });
  console.log(res);
  const onInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const newForm = { ...fields };
    newForm[name] = value;
    setValue(newForm);
  };
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT LOGIN</h2>
        <InputField
          label="Email"
          type="text"
          name="email"
          placeholder="example@example.com"
          onChange={onInput}
        />
        {
          <p className="h-8 text-red-500">
            {getErrorMessage(res.error, 'email')}
          </p>
        }
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="password..."
          onChange={onInput}
        />
        {
          <p className="h-8 text-red-500">
            {getErrorMessage(res.error, 'password')}
          </p>
        }
        <Button text="Login" />
      </div>
    </div>
  );
}
export default LoginPage;

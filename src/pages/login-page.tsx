//import {ChangeEvent, useState} from "react";
import InputField from '../components/inputField.tsx';

function LoginPage() {
  // const [fields, setValue] = useState<Record<string, string>>({ email: '', password: '' });
  //const res = scheme.safeParse({ ...fields });
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="w-1/2 h-1/2 border border-[#B5B5B5] rounded-[10px]">
        <h2 className="font-bold">ACCOUNT LOGIN</h2>
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <InputField
          label="Passwors"
          type="passwors"
          name="passwors"
          placeholder="password..."
        />
      </div>
    </div>
  );
}
export default LoginPage;

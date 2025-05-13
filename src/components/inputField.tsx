//import { getErrorMessage } from '../utils/validation.ts';
import { JSX } from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { LoginData } from '../pages/LoginPage';

type InputFieldProps = {
  label: string;
  type: string;
  name: keyof LoginData;
  placeholder?: string;
  register: UseFormRegister<LoginData>;
};

function InputField({
  label,
  name,
  type,
  placeholder,
  register,
}: InputFieldProps): JSX.Element {
  return (
    <div className="flex flex-col mt-1.5">
      <label className="text-left text-sm leading-8 text-[#545454]">
        {label}
      </label>
      <input
        type={type}
        className="border border-[#9F9F9F] h-14 rounded-[7px] p-4 hover:cursor-pointer"
        {...register(name)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;

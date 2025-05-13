import { JSX } from 'react';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
};

export function InputField<T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  register,
}: InputFieldProps<T>): JSX.Element {
  console.log();
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

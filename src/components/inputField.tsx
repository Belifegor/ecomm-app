//import { getErrorMessage } from '../utils/validation.ts';
import { /*ChangeEvent,*/ JSX } from 'react';

type InputFieldProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps): JSX.Element {
  return (
    <div className="flex flex-col mt-1.5">
      <label className="text-left text-sm leading-8 text-[#545454]">
        {props.label}
      </label>
      <input
        type={props.type}
        className="border border-[#9F9F9F] h-14 rounded-[7px] p-4 hover:cursor-pointer"
        name={props.name}
        placeholder={props.placeholder} /*onChange={onChange}*/
      />
      {<p className="h-8 text-red-500">{'error'}</p>}
    </div>
  );
}

export default InputField;

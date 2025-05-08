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
    <div className="flex flex-col">
      <label className="text-left">{props.label}</label>
      <input
        type={props.type}
        className="border border-gray-300"
        name={props.name}
        placeholder={props.placeholder} /*onInput={onInput}*/
      />
      {<p className="h-8 text-red-500">{'error'}</p>}
    </div>
  );
}

export default InputField;

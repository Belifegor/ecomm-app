import { JSX } from 'react';

type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  disabled: boolean;
};

function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`h-14 w-1/1 rounded-[7px] hover:cursor-pointer ${props.disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800, '} text-white mt-6`}
    >
      {props.text}
    </button>
  );
}
export default Button;

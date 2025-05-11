import { JSX } from 'react';

type ButtonProps = {
  text: string;
};

function Button(props: ButtonProps): JSX.Element {
  return (
    <button className="h-14 w-1/1 rounded-[7px] bg-black text-white mt-6">
      {props.text}
    </button>
  );
}
export default Button;

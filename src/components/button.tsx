type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  text: string;
  disabled: boolean;
};

function Button({ type, text, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-14 w-1/1 rounded-[7px] hover:cursor-pointer ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-black hover:bg-gray-800, '
      } text-white mt-6`}
    >
      {text}
    </button>
  );
}
export default Button;

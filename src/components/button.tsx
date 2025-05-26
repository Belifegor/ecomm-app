function Button({
  type,
  disabled,
  text,
  className,
}: {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  text: string;
  className: string | '';
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-14 w-1/1 rounded-[7px] hover:cursor-pointer ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800, '} text-white mt-6 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;

function Button({
  type,
  disabled,
  text,
  className,
  onClick,
}: {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  text: string;
  className: string | '';
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`h-14 w-1/1 rounded-[7px] hover:cursor-pointer disabled:cursor-not-allowed ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800, '} mt-6 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;

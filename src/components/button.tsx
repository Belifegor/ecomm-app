type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?: () => void;
};
function Button({
  type,
  disabled = false,
  text,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-1/1 rounded-[7px] hover:cursor-pointer disabled:cursor-not-allowed ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800, '} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;

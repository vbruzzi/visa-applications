interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseClasses = "inline-block font-bold rounded-md transition-colors";

  const variantClasses = {
    primary:
      "bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:bg-gray-400",
    ghost:
      "bg-transparent text-black hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent",
  };
  return (
    <button
      type={onClick ? "button" : type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

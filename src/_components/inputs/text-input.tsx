interface TextInputProps {
  id?: string;
  type?: "text" | "email" | "url" | "search" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string | boolean;
  className?: string;
  disabled?: boolean;
}

export default function TextInput({
  id,
  value,
  onChange,
  placeholder,
  label,
  error,
  type = "text",
  required = false,
  className = "",
  disabled = false,
}: TextInputProps) {
  const isValid = error === undefined || error === "" || error === false;
  const errorMessage = typeof error === "string" ? error : "";

  // Use label as placeholder if no explicit placeholder is provided
  const effectivePlaceholder = placeholder || label || "";

  const baseInputClasses = `w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400 text-gray-900 ${
    !isValid ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
  } ${className}`;

  return (
    <div className="mb-6">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={effectivePlaceholder}
        required={required}
        disabled={disabled}
        className={baseInputClasses}
      />
      {!isValid && errorMessage && (
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

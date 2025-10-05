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

  const baseInputClasses = `w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
    !isValid
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300"
  } ${className}`;

  const input = (
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={baseInputClasses}
    />
  );

  // If no label, return just the input
  if (!label) {
    return (
      <div>
        {input}
        {!isValid && errorMessage && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }

  // Return input with label wrapper
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {input}
      {!isValid && errorMessage && (
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

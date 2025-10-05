interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string | boolean;
  className?: string;
  disabled?: boolean;
}

export default function SelectInput({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  required = false,
  error,
  className = "",
  disabled = false,
}: SelectInputProps) {
  const isValid = error === undefined || error === "" || error === false;
  const errorMessage = typeof error === "string" ? error : "";

  const baseSelectClasses = `w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
    !isValid
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300"
  } ${className}`;

  const select = (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={baseSelectClasses}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  // If no label, return just the select
  if (!label) {
    return (
      <div>
        {select}
        {!isValid && errorMessage && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }

  // Return select with label wrapper
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {select}
      {!isValid && errorMessage && (
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

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

  // Use label as placeholder if no explicit placeholder is provided
  const effectivePlaceholder =
    placeholder === "Select an option" && label ? label : placeholder;

  const baseSelectClasses = `w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none h-[42px] ${
    value ? "text-gray-900" : "text-gray-400"
  } ${
    !isValid ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
  } ${className}`;

  return (
    <div className="mb-6">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={baseSelectClasses}
      >
        <option value="" className="text-gray-400">
          {effectivePlaceholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!isValid && errorMessage && (
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

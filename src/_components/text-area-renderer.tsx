import {
  ControlProps,
  rankWith,
  isStringControl,
  and,
  optionIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

const TextAreaRenderer = ({
  data,
  handleChange,
  path,
  label,
  required,
  errors,
  schema,
}: ControlProps) => {
  const isValid = errors === undefined || errors === "";
  const description = schema.description;
  const placeholder = description || label || "";

  return (
    <div className="mb-6">
      <textarea
        id={path}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        rows={5}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize placeholder:text-gray-400 text-gray-900 min-h-[120px] text-base leading-relaxed ${
          !isValid
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        }`}
        required={required}
      />
      {!isValid && <p className="text-red-600 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default withJsonFormsControlProps(TextAreaRenderer);

// Tester: applies to string controls with multi option in uischema
export const textAreaTester = rankWith(
  4,
  and(isStringControl, optionIs("multi", true))
);

import {
  ControlProps,
  rankWith,
  isStringControl,
  and,
  formatIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

const UrlFieldRenderer = ({
  data,
  handleChange,
  path,
  label,
  required,
  errors,
}: ControlProps) => {
  const isValid = errors === undefined || errors === "";

  return (
    <div className="mb-6">
      <label
        htmlFor={path}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="url"
        id={path}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder="https://"
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          !isValid
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        }`}
        required={required}
      />
      {!isValid && <p className="text-red-600 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default withJsonFormsControlProps(UrlFieldRenderer);

export const urlFieldTester = rankWith(
  4,
  and(isStringControl, formatIs("uri"))
);

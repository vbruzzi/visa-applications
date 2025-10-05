import {
  ControlProps,
  rankWith,
  isStringControl,
  and,
  schemaMatches,
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

  return (
    <div className="mb-6">
      <label
        htmlFor={path}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      <textarea
        id={path}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        rows={5}
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y ${
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

export default withJsonFormsControlProps(TextAreaRenderer);

// Tester: applies to string controls with multi option in uischema
export const textAreaTester = rankWith(
  4,
  and(
    isStringControl,
    schemaMatches((schema) => {
      // This will match textarea fields - we'll use uischema options to determine
      return (
        schema.title === "How can we help you?" ||
        schema.title === "Comments/Notes"
      );
    })
  )
);

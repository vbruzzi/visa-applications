import {
  ControlProps,
  rankWith,
  and,
  optionIs,
  JsonSchema,
  schemaMatches,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

const CheckboxGroupRenderer = ({
  data,
  handleChange,
  path,
  label,
  required,
  errors,
  schema,
}: ControlProps) => {
  const isValid = errors === undefined || errors === "";
  const items = schema.items as JsonSchema;
  const options = (items && "enum" in items ? items.enum : []) as string[];
  const selectedValues = data || [];

  const handleCheckboxChange = (value: string) => {
    let newValues;
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter((v: string) => v !== value);
    } else {
      newValues = [...selectedValues, value];
    }
    handleChange(path, newValues);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option: string) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`${path}-${option}`}
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor={`${path}-${option}`}
              className="ml-3 text-sm text-gray-700 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {!isValid && <p className="text-red-600 text-sm mt-2">{errors}</p>}
    </div>
  );
};

export default withJsonFormsControlProps(CheckboxGroupRenderer);

export const checkboxGroupTester = rankWith(
  5,
  and(
    schemaMatches((schema) => {
      // Check if it's an array with enum items
      return (
        schema.type === "array" &&
        schema.items !== undefined &&
        !Array.isArray(schema.items) &&
        "enum" in schema.items
      );
    }),
    optionIs("format", "checkbox")
  )
);

import {
  ControlProps,
  rankWith,
  isEnumControl,
  and,
  optionIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import SelectInput from "./inputs/select-input";

const SelectFieldRenderer = ({
  data,
  handleChange,
  path,
  label,
  required,
  errors,
  schema,
}: ControlProps) => {
  // Get enum values from schema
  const enumValues = (schema.enum || []) as string[];

  // Convert enum values to options format
  const options = enumValues.map((value) => ({
    value: value,
    label: value,
  }));

  return (
    <SelectInput
      id={path}
      value={data || ""}
      onChange={(value) => handleChange(path, value)}
      options={options}
      label={label}
      required={required}
      error={errors}
    />
  );
};

export default withJsonFormsControlProps(SelectFieldRenderer);

export const selectFieldTester = rankWith(
  4,
  and(isEnumControl, optionIs("format", "select"))
);

import { ControlProps, rankWith, isStringControl } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TextInput from "./inputs/text-input";

const TextFieldRenderer = ({
  data,
  handleChange,
  path,
  label,
  required,
  errors,
}: ControlProps) => {
  return (
    <TextInput
      id={path}
      type="text"
      value={data || ""}
      onChange={(value) => handleChange(path, value)}
      label={label}
      required={required}
      error={errors}
    />
  );
};

export default withJsonFormsControlProps(TextFieldRenderer);

export const textFieldTester = rankWith(3, isStringControl);

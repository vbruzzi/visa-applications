import {
  ControlProps,
  rankWith,
  isStringControl,
  and,
  formatIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TextInput from "./inputs/text-input";

const EmailFieldRenderer = ({
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
      type="email"
      value={data || ""}
      onChange={(value) => handleChange(path, value)}
      label={label}
      required={required}
      error={errors}
    />
  );
};

export default withJsonFormsControlProps(EmailFieldRenderer);

export const emailFieldTester = rankWith(
  4,
  and(isStringControl, formatIs("email"))
);

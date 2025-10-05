import {
  ControlProps,
  rankWith,
  isStringControl,
  and,
  formatIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TextInput from "./inputs/text-input";

const UrlFieldRenderer = ({
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
      type="url"
      value={data || ""}
      onChange={(value) => handleChange(path, value)}
      label={label}
      required={required}
      error={errors}
      placeholder="https://"
    />
  );
};

export default withJsonFormsControlProps(UrlFieldRenderer);

export const urlFieldTester = rankWith(
  4,
  and(isStringControl, formatIs("uri"))
);

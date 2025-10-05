import {
  ControlProps,
  rankWith,
  and,
  isStringControl,
  optionIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

const FileUploadRenderer = ({
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the file name for now - in production you'd upload to server
      handleChange(path, file.name);
    }
  };

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
      <input
        type="file"
        id={path}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border rounded-md ${
          !isValid ? "border-red-500" : "border-gray-300"
        }`}
        required={required}
      />
      {data && <p className="text-sm text-gray-600 mt-2">Selected: {data}</p>}
      {!isValid && <p className="text-red-600 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);

export const fileUploadTester = rankWith(
  5,
  and(isStringControl, optionIs("format", "file"))
);

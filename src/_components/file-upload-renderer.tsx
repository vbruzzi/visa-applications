import {
  ControlProps,
  rankWith,
  and,
  isStringControl,
  optionIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { useState } from "react";

const FileUploadRenderer = ({
  handleChange,
  path,
  label,
  required,
  errors,
  schema,
}: ControlProps) => {
  const isValid = errors === undefined || errors === "";
  const description = schema.description;
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Read file as base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          // Store base64 string (includes data:mime;base64, prefix)
          handleChange(path, base64);
          handleChange(path + "FileName", file.name);
          setFileName(file.name);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Failed to read file:", error);
      }
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
      {fileName && (
        <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>
      )}
      {!isValid && <p className="text-red-600 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);

export const fileUploadTester = rankWith(
  5,
  and(isStringControl, optionIs("format", "file"))
);

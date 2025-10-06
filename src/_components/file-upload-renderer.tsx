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
}: ControlProps) => {
  const isValid = errors === undefined || errors === "";
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
      <input
        type="file"
        id={path}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className={`block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-300 rounded-md ${
          !isValid ? "border-red-500" : ""
        }`}
        required={required}
      />
      {fileName && (
        <p className="text-sm mt-2 text-gray-900">Selected: {fileName}</p>
      )}
      {!fileName && label && (
        <p className="text-sm mt-2 text-gray-400">{label}</p>
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

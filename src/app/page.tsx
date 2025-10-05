"use client";

import { JsonForms } from "@jsonforms/react";
import { vanillaCells } from "@jsonforms/vanilla-renderers";
import { useState } from "react";
import { customRenderers } from "@/_components";

// JSON Schema defining the structure of the form data
const schema = {
  type: "object",
  required: ["firstName", "lastName", "email", "countryOfCitizenship", "visas"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      title: "First Name",
    },
    lastName: {
      type: "string",
      minLength: 1,
      title: "Last Name",
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    nationality: {
      type: "string",
      minLength: 1,
      title: "Country of Citizenship",
    },
    personalWebsite: {
      type: "string",
      format: "uri",
      title: "LinkedIn or Personal Website",
    },
    visas: {
      type: "array",
      title: "Visas categories of interest?",
      items: {
        type: "string",
        enum: ["O-1", "EB-1A", "EB-2 NIW", "I don't know"],
      },
      uniqueItems: true,
      minItems: 1,
    },
    resume: {
      type: "string",
      title: "Resume Upload",
      description: "Upload your CV/Resume",
    },
    comments: {
      type: "string",
      title: "How can we help you?",
      description:
        "What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?",
    },
  },
};

// UI Schema defining how the form should be rendered
const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/firstName",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
    },
    {
      type: "Control",
      scope: "#/properties/email",
    },
    {
      type: "Control",
      scope: "#/properties/nationality",
    },
    {
      type: "Control",
      scope: "#/properties/personalWebsite",
    },
    {
      type: "Control",
      scope: "#/properties/visas",
      options: {
        format: "checkbox",
      },
    },
    {
      type: "Control",
      scope: "#/properties/resume",
      options: {
        format: "file",
      },
    },
    {
      type: "Control",
      scope: "#/properties/comments",
      options: {
        multi: true,
        rows: 5,
      },
    },
  ],
};

export default function Home() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState<
    Array<{ message: string; dataPath: string }>
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.length > 0) {
      return;
    }

    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Redirect to confirmation page
        // router.push('/confirmation');
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Want to udnerstand your visa options?
          </h1>
          <p className="text-gray-600 mb-8">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>

          <form onSubmit={handleSubmit}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={customRenderers}
              cells={vanillaCells}
              onChange={({ data, errors }) => {
                setData(data);
                setErrors(
                  errors?.map((e) => ({
                    message: e.message || "Validation error",
                    dataPath: e.instancePath || "",
                  })) || []
                );
              }}
            />

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setData({})}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </form>

          {errors.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-red-800 font-medium mb-2">
                Please fix the following errors:
              </h3>
              <ul className="list-disc list-inside text-red-700 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

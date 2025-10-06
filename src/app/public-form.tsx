"use client";

import { JsonForms } from "@jsonforms/react";
import { vanillaCells } from "@jsonforms/vanilla-renderers";
import { useState } from "react";
import { customRenderers } from "@/_components";
import { VisaApplicationData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { submitVisaApplication } from "./actions/submissions";
import { FormSchema } from "./actions/schema";

interface PublicFormProps {
  formSchema: FormSchema;
}

export default function PublicForm({ formSchema }: PublicFormProps) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState<
    Array<{ message: string; dataPath: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(errors);
    if (errors.length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitVisaApplication(data as VisaApplicationData);

      if (result.success) {
        router.push("/success");
      }
    } catch (error) {
      console.error("Failed to submit application:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Want to understand your visa options?
          </h1>
          <p className="text-gray-600 mb-8">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>

          <form onSubmit={handleSubmit}>
            <JsonForms
              schema={formSchema.schema}
              uischema={formSchema.uischema}
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
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              <button
                type="button"
                onClick={() => setData({})}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { JsonForms } from "@jsonforms/react";
import { vanillaCells } from "@jsonforms/vanilla-renderers";
import { useState } from "react";
import { customRenderers } from "@/_components";
import { FormSchema, VisaApplicationData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { submitVisaApplication } from "./actions/submissions";
import Info from "@/_components/icons/info";
import { Button } from "@/_components/inputs";

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
      // TODO: Display error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg p-8">
          <Info />
          <h1 className="text-3xl font-bold mb-2 text-center">
            Want to understand your visa options?
          </h1>
          <p className="font-bold mb-8 text-center">
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
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

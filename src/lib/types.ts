import { JsonSchema } from "@jsonforms/core";

export interface VisaApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  personalWebsite?: string;
  visas: string[];
  /** Base64 encoded file data */
  resume?: string;
  /** Original filename of the uploaded resume */
  resumeFileName?: string;
  comments?: string;
}

export type Lead = {
  id: number;
  firstName: string;
  lastName: string;
  submitted: Date;
  status: string;
  countryOfCitizenship: string;
};

export interface FormSchema {
  schema: JsonSchema;
  uischema: {
    type: string;
    elements: Array<unknown>;
  };
}

import { promises as fs } from "fs";
import path from "path";
import { FormSchema } from "../types";

const schemaFilePath = path.join(process.cwd(), "src/data/form-schema.json");

/**
 * Abstraction for an actual backend implementation that would read from a database.
 * @returns The form schema saved in form-schema.json.
 */
export default async function getFormSchema(): Promise<FormSchema> {
  try {
    const fileContent = await fs.readFile(schemaFilePath, "utf-8");
    const formSchema = JSON.parse(fileContent) as FormSchema;
    return formSchema;
  } catch (error) {
    console.error("Failed to read form schema from file:", error);
    throw new Error("Failed to load form schema");
  }
}

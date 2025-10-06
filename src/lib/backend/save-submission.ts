import path from "path";
import { promises as fs } from "fs";
import { Lead, VisaApplicationData } from "../types";

const leadsFilePath = path.join(process.cwd(), "src/data/leads.json");

/**
 * Abstraction for an actual backend implementation that would save to a database.
 * This will read from a local JSON file and append the new inquiry.
 * @param data - The inquiry to save
 */
export default async function saveSubmission(data: VisaApplicationData) {
  const fileContent = await fs.readFile(leadsFilePath, "utf-8");
  const leads: Array<Omit<Lead, "submitted"> & { submitted: string }> =
    JSON.parse(fileContent);

  const newLead = {
    id: leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 0,
    firstName: data.firstName,
    lastName: data.lastName,
    submitted: new Date().toISOString(),
    status: "PENDING",
    countryOfCitizenship: data.nationality,
  };

  leads.push(newLead);

  await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");

  // File isn't used elsewhere, so it's not saved anywhere.
  // In a real app, it would be saved here.
  // The user could also possibly upload directly to a temporary S3 with presigned URLs.
}

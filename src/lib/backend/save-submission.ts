import path from "path";
import { promises as fs } from "fs";
import { Lead, VisaApplicationData } from "../types";

const leadsFilePath = path.join(process.cwd(), "src/data/leads.json");
const uploadsDir = path.join(process.cwd(), "src/data/uploads");

/**
 * Abstraction for an actual backend implementation that would save to a database.
 * This will read from a local JSON file and append the new inquiry.
 * @param data - The inquiry to save
 */
export default async function saveSubmission(data: VisaApplicationData) {
  const fileContent = await fs.readFile(leadsFilePath, "utf-8");
  const leads: Array<Omit<Lead, "submitted"> & { submitted: string }> =
    JSON.parse(fileContent);

  const newLeadId =
    leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;

  // TODO: Customized error messages based on where it failed
  // TODO: Maybe we can continue even if file upload fails?
  if (data.resume && data.resumeFileName) {
    await saveUploadedFile(data.resume, data.resumeFileName, newLeadId);
  }

  const newLead = {
    id: newLeadId,
    firstName: data.firstName,
    lastName: data.lastName,
    submitted: new Date().toISOString(),
    status: "PENDING",
    countryOfCitizenship: data.nationality,
  };

  leads.push(newLead);

  await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
}

/**
 * In prod this might go directly to S3 (or any storage) so it can be processed.
 * For this demo it's just being saved in data/uploads.
 * @param base64Data - The file data as base64 string (with data:mime;base64, prefix)
 * @param fileName - Original filename
 * @param leadId - ID of the lead this file belongs to
 * @returns The relative path where the file was saved, or undefined if failed
 */
async function saveUploadedFile(
  base64Data: string,
  fileName: string,
  leadId: number
): Promise<string | undefined> {
  try {
    // Ensure uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create a unique filename using the lead ID and timestamp
    const timestamp = Date.now();
    const fileExtension = path.extname(fileName);
    const uniqueFileName = `resume_${leadId}_${timestamp}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    // Remove data URL prefix (data:mime;base64,) and convert base64 to Buffer
    const base64String = base64Data.split(",")[1] || base64Data;
    const buffer = Buffer.from(base64String, "base64");
    await fs.writeFile(filePath, buffer);

    // Store relative path
    const relativePath = `uploads/${uniqueFileName}`;

    console.log(`Saved resume to: ${relativePath}`);
    return relativePath;
  } catch (error) {
    console.error("Failed to save resume file:", error);
    return undefined;
  }
}

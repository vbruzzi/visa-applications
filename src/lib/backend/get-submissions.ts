import { promises as fs } from "fs";
import path from "path";
import { Lead } from "@/lib/types";

const leadsFilePath = path.join(process.cwd(), "src/data/leads.json");

/**
 * Abstraction for an actual backend implementation that would read from a database.
 * @returns The form schema saved in leads.json.
 */
export default async function getSubmissions(): Promise<Lead[]> {
  try {
    const fileContent = await fs.readFile(leadsFilePath, "utf-8");
    const leadsData = JSON.parse(fileContent);

    // Convert submitted date strings to Date objects
    return leadsData.map((lead: Lead & { submitted: string }) => ({
      ...lead,
      submitted: new Date(lead.submitted),
    }));
  } catch (error) {
    console.error("Failed to read leads from file:", error);
    return [];
  }
}

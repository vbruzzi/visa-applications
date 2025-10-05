"use server";

import { Lead } from "@/stores/lead-store";

const leads: Lead[] = [
  {
    id: 0,
    firstName: "Joe",
    lastName: "Pesci",
    submitted: new Date("2025-09-01T10:00:00Z"),
    status: "PENDING",
    countryOfCitizenship: "Canada",
  },
  {
    id: 1,
    firstName: "Marisa",
    lastName: "Tomei",
    submitted: new Date("2025-09-02T11:30:00Z"),
    status: "REACHED_OUT",
    countryOfCitizenship: "Italy",
  },
];

export async function getLeads(): Promise<Lead[]> {
  // Simulate async database call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return leads;
}

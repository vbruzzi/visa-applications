"use server";

import getSubmissions from "@/lib/backend/get-submissions";

export async function getLeads() {
  return await getSubmissions();
}

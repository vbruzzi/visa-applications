"use server";

import getFormSchema from "@/lib/backend/get-form-schema";

export async function getSchema() {
  return await getFormSchema();
}

"use server";

import saveSubmission from "@/lib/backend/save-submission";
import { VisaApplicationData } from "@/lib/types";

/**
 * Registers an inquiry for a case review. This would be validated with Zod and
 * saved to an actual store.
 * @param data VisaApplicationData
 * @returns
 */
export async function submitVisaApplication(data: VisaApplicationData) {
  try {
    await saveSubmission(data);

    return { success: true };
  } catch (error) {
    console.error("Failed to save submission:", error);
    return { success: false, error: "Failed to save submission" };
  }
}

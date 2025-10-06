import { Lead } from "@/lib/types";
import { useEffect, useState } from "react";

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

export function useLeads() {
  const [state, setState] = useState<{ leads: Lead[]; loading: boolean }>({
    leads: [],
    loading: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setState({ leads, loading: false });
    }, 1000);
  }, []);

  return state;
}

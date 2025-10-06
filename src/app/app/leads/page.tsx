import { getLeads } from "@/app/actions/leads";
import LeadsTable from "./leads-table";

export default async function LeadsPage() {
  const leads = await getLeads();

  return <LeadsTable data={leads} />;
}

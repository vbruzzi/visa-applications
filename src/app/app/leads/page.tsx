import { getLeads } from "./actions";
import LeadsTable from "./leads-table";

export default async function LeadsPage() {
  const leads = await getLeads();

  return <LeadsTable leads={leads} />;
}

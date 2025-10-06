import { getLeads } from "@/app/actions/leads";
import LeadsTable from "./leads-table";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Leads</h1>
      <LeadsTable data={leads} />
    </div>
  );
}

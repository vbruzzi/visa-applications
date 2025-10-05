"use client";

import { useEffect } from "react";
import { DataTable } from "@/_components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/stores/lead-store";
import { useLeadStore } from "@/providers/lead-store-provider";

interface LeadsTableProps {
  leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  const setLeads = useLeadStore((state) => state.setLeads);
  const storedLeads = useLeadStore((state) => state.leads);

  // Store the leads data in Zustand store when component mounts or leads change
  useEffect(() => {
    setLeads(leads);
  }, [leads, setLeads]);

  const columns: ColumnDef<Lead>[] = [
    {
      header: "Name",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "name",
    },
    {
      header: "Submitted",
      accessorKey: "submitted",
      cell: ({ getValue }) => {
        const date = getValue() as Date;
        return date.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: {
        facetedFiltering: true,
      },
      cell: ({ getValue }) => {
        const status = getValue() as string;
        switch (status) {
          case "PENDING":
            return "Pending";
          case "REACHED_OUT":
            return "Reached Out";
          default:
            return "Unknown";
        }
      },
    },
    {
      header: "Country",
      accessorKey: "countryOfCitizenship",
    },
  ];

  return <DataTable data={storedLeads} columns={columns} pageSize={5} />;
}

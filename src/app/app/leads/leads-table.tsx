"use client";

import { useEffect } from "react";
import { DataTable } from "@/_components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useLeadStore } from "@/providers/lead-store-provider";
import { Button } from "@/_components/inputs";
import { Lead } from "@/lib/types";

interface LeadsTableProps {
  data: Lead[];
}

export default function LeadsTable({ data }: LeadsTableProps) {
  const { setLeads, leads, changeStatus } = useLeadStore((state) => state);

  // Store the leads data in Zustand store when component mounts or leads change
  useEffect(() => {
    setLeads(data);
  }, [data, setLeads]);

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
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original;
        const status = lead.status;

        if (status === "PENDING") {
          return (
            <Button
              onClick={() => changeStatus(lead.id, "REACHED_OUT")}
              variant="ghost"
            >
              Update Status
            </Button>
          );
        }
        return null;
      },
      header: "",
    },
  ];

  return <DataTable data={leads} columns={columns} />;
}

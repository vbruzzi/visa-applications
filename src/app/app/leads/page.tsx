"use client";

import { DataTable } from "@/_components/data-table";
import { ColumnDef } from "@tanstack/react-table";

type Lead = {
  firstName: string;
  lastName: string;
  submitted: Date;
  status: string;
  countryOfCitizenship: string;
};

const leads: Lead[] = [
  {
    firstName: "Joe",
    lastName: "Pesci",
    submitted: new Date("2025-09-01T10:00:00Z"),
    status: "PENDING",
    countryOfCitizenship: "Canada",
  },
  {
    firstName: "Marisa",
    lastName: "Tomei",
    submitted: new Date("2025-09-02T11:30:00Z"),
    status: "REACHED_OUT",
    countryOfCitizenship: "Italy",
  },
];

export default function LeadsPage() {
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

  return <DataTable data={leads} columns={columns} pageSize={5} />;
}

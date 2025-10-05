import { useMemo } from "react";
import { Column } from "@tanstack/react-table";
import SelectInput from "../inputs/select-input";

interface IDataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

/**
 * Faceted filter for data table. Creates a dropdown with unique values from the column.
 */
export default function Filter<TData, TValue>({
  column,
  title,
}: IDataTableFacetedFilterProps<TData, TValue>) {
  const uniqueValues = useMemo(() => {
    const facets = column?.getFacetedUniqueValues();
    const sortedUniqueValues = Array.from(facets?.keys() ?? []).sort();

    return sortedUniqueValues.map((value) => ({
      value: String(value),
      label: String(value),
    }));
  }, [column]);

  return (
    <SelectInput
      id={`filter-${title}`}
      value={(column?.getFilterValue() as string) ?? ""}
      onChange={(value) => {
        column?.setFilterValue(value || undefined);
      }}
      options={uniqueValues}
      label={title}
      placeholder="All"
    />
  );
}

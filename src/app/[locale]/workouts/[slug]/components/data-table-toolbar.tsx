"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

import { AddInterval } from "@/components/dialogs/add-interval-dialog";
import { useIntervals } from "@/hooks/use-intervals";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  slug: string;
}

export function DataTableToolbar<TData>({
  table,
  slug,
}: DataTableToolbarProps<TData>) {
  const { addInterval } = useIntervals(slug);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        <AddInterval addInterval={addInterval} className="h-8" />
      </div>
    </div>
  );
}

"use client";

import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";

import { AddWorkout } from "@/components/dialogs/add-workout-dialog";
import { useWorkouts } from "@/hooks/use-workouts";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { addWorkout } = useWorkouts();
  const t = useTranslations('Common');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={t('filterTasks')}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex flex-1 items-center space-x-2">
        <DataTableViewOptions table={table} />
        <AddWorkout addWorkout={addWorkout} className="h-8" />
      </div>
    </div>
  );
}

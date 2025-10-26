"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateGerman } from "@/lib/utils";
import { Workout } from "@/app/[locale]/workouts/data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/app/[locale]/workouts/components/data-table-row-actions";

export const getWorkoutColumns = (
  onDelete: (slug: string) => void,
  onCopy: (slug: string) => void,
  t: (key: string) => string
): ColumnDef<Workout>[] => [
  {
    accessorKey: "workout_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('workoutNumber')} />
    ),
    cell: ({ row }) => <div>{row.getValue("workout_number")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('name')} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('description')} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('created')} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {formatDateGerman(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onDelete={() => onDelete(row.original.slug!)}
        onCopy={() => onCopy(row.original.slug!)}
      />
    ),
  },
];

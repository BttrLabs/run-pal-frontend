"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateGerman } from "@/lib/utils";
import { Interval } from "@/app/[locale]/workouts/[slug]/data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/app/[locale]/workouts/[slug]/components/data-table-row-actions";

export const getIntervalColumns = (
  onDelete: (interval_number: number) => void,
  t: (key: string) => string
): ColumnDef<Interval>[] => [
  {
    accessorKey: "interval_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('intervalNumber')} />
    ),
    cell: ({ row }) => <div>{row.getValue("interval_number")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "distance_m",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('distanceMeters')} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("distance_m")}
      </span>
    ),
  },
  {
    accessorKey: "time_s",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('timeSeconds')} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("time_s")}
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
        onDelete={() => onDelete(row.original.interval_number!)}
      />
    ),
  },
];

"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDelete?: () => void;
  onCopy?: () => void;
}

export function DataTableRowActions<TData>({
  row,
  onDelete,
  onCopy,
}: DataTableRowActionsProps<TData>) {
  const t = useTranslations('Common');
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">{t('openMenu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopy}>{t('makeACopy')}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>{t('delete')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

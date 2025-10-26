"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

interface AddIntervalProps {
  className?: string;
  addInterval: (
    distance_m: number,
    time_s: number,
    note?: string,
  ) => Promise<void>;
}

export function AddInterval({ className, addInterval }: AddIntervalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const { open } = useSidebar();
  const t = useTranslations('Intervals');
  const tCommon = useTranslations('Common');

  const parseNumber = (str: string) => {
    // Komma zu Punkt, alles außer Ziffern und Punkt entfernen
    const sanitized = str.replace(",", ".").replace(/[^\d.]/g, "");
    const num = parseFloat(sanitized);
    return isNaN(num) ? 0 : num;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addInterval(
      parseNumber(distance),
      parseNumber(time),
      note || undefined,
    );
    setDistance("");
    setTime("");
    setNote("");
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className={cn("cursor-pointer", className)}>
          <PlusIcon />
          {open && <span className="ml-2">{t('addInterval')}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('addInterval')}</DialogTitle>
          <DialogDescription>
            {t('addIntervalDescription')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="distance">{t('distance')}</Label>
            <Input
              id="distance"
              type="text"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder={t('distancePlaceholder')}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="time">{t('time')}</Label>
            <Input
              id="time"
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder={t('timePlaceholder')}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="note">{t('notes')}</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{tCommon('cancel')}</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {t('addInterval')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

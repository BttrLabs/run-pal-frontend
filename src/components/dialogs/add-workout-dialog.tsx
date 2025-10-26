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

interface AddWorkoutProps {
  className?: string;
  addWorkout: (name: string, description: string) => Promise<void>;
}

export function AddWorkout({ className, addWorkout }: AddWorkoutProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { open } = useSidebar(); // sidebar state
  const t = useTranslations('Workouts');
  const tCommon = useTranslations('Common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await addWorkout(name, description);
    setName("");
    setDescription("");
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className={cn("cursor-pointer", className)}>
          <PlusIcon />
          {open && <span className="ml-2">{t('addWorkout')}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('addWorkout')}</DialogTitle>
          <DialogDescription>
            {t('addWorkoutDescription')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="workout-name">{t('workoutName')}</Label>
            <Input
              id="workout-name"
              name="name"
              placeholder={t('workoutNamePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder={t('notesPlaceholder')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{tCommon('cancel')}</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {t('addWorkout')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

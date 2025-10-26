"use client";

import { IconFolderX } from "@tabler/icons-react";
import { AddWorkout } from "@/components/dialogs/add-workout-dialog";
import { useTranslations } from "next-intl";

import { useWorkouts } from "@/hooks/use-workouts";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function WorkoutNotFound() {
  const { addWorkout } = useWorkouts();
  const t = useTranslations('Workouts');

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderX />
        </EmptyMedia>
        <EmptyTitle>{t('workoutNotFound')}</EmptyTitle>
        <EmptyDescription>{t('workoutDoesntExist')}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <AddWorkout addWorkout={addWorkout} />
        </div>
      </EmptyContent>
    </Empty>
  );
}

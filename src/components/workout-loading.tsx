"use client";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export function WorkoutLoading() {
  const t = useTranslations('Workouts');
  
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{t('workoutLoading')}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}

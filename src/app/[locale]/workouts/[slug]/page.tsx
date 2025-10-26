"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useWorkout } from "@/hooks/use-workout";
import { WorkoutNotFound } from "@/components/workout-not-found";
import { WorkoutLoading } from "@/components/workout-loading";
import { useIntervals } from "@/hooks/use-intervals";
import { DataTable } from "@/app/[locale]/workouts/[slug]/data-table";
import { getIntervalColumns } from "@/app/[locale]/workouts/[slug]/columns";

export default function Page() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam || null;
  const t = useTranslations('Navigation');
  const tWorkouts = useTranslations('Workouts');
  const tIntervals = useTranslations('Intervals');

  const { workout, isLoading } = useWorkout(slug);
  const { intervals, deleteInterval } = useIntervals(slug || "");

  const columns = getIntervalColumns(deleteInterval, tIntervals);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{t('home')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/workouts">{t('myWorkouts')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {workout?.name ?? tWorkouts('notFound')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {isLoading ? (
            <WorkoutLoading />
          ) : workout ? (
            <main className="px-6 py-8">
              <div className="mb-8 space-y-6">
                <h1 className="text-3xl font-semibold mb-2">
                  {workout.name || tWorkouts('noName')}
                </h1>
                <p className="text-muted-foreground">
                  {workout.description || tWorkouts('noDescription')}
                </p>
              </div>

              <DataTable data={intervals} columns={columns} slug={slug || ""} />
            </main>
          ) : (
            <WorkoutNotFound />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

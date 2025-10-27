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
import { IntervalCard } from "@/components/interval-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { AddInterval } from "@/components/dialogs/add-interval-dialog";

export default function Page() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam || null;
  const t = useTranslations("Navigation");
  const tWorkouts = useTranslations("Workouts");
  const tIntervals = useTranslations("Intervals");
  const isMobile = useIsMobile();

  const { workout, isLoading } = useWorkout(slug);
  const { intervals, deleteInterval, addInterval } = useIntervals(slug || "");

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
                    <Link href="/">{t("home")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/workouts">{t("myWorkouts")}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {workout?.name ?? tWorkouts("notFound")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 pt-0">
          {isLoading ? (
            <WorkoutLoading />
          ) : workout ? (
            <main className="px-6">
              <div className="mb-8 space-y-6">
                <h1 className="text-3xl font-semibold mb-2">
                  {workout.name || tWorkouts("noName")}
                </h1>
                <p className="text-muted-foreground">
                  {workout.description || tWorkouts("noDescription")}
                </p>
              </div>

              {!isMobile ? (
                <DataTable
                  data={intervals}
                  columns={columns}
                  slug={slug || ""}
                />
              ) : (
                <div className="space-y-5">
                  <AddInterval addInterval={addInterval} />
                  <div className="grid gap-4 w-full">
                    {intervals
                      .slice() // avoid mutating original array
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((interval) => (
                        <IntervalCard
                          key={interval.interval_number}
                          distanz={String(interval.distance_m)}
                          zeit={String(interval.time_s)}
                          createdAt={interval.createdAt}
                          interval_id={String(interval.interval_number)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </main>
          ) : (
            <WorkoutNotFound />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

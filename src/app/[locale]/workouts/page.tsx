"use client";

import Link from "next/link";
import { getWorkoutColumns } from "@/app/[locale]/workouts/columns";
import { DataTable } from "@/app/[locale]/workouts/data-table";
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
import { useWorkouts } from "@/hooks/use-workouts";

export default function Page() {
  const { workouts, deleteWorkout, copyWorkout } = useWorkouts();
  const t = useTranslations('Navigation');
  const tWorkouts = useTranslations('Workouts');
  const columns = getWorkoutColumns(deleteWorkout, copyWorkout, tWorkouts);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{t('home')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('myWorkouts')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="h-full flex-1 flex-col space-y-8">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {tWorkouts('welcomeBack')}
                </h2>
                <p className="text-muted-foreground">
                  {tWorkouts('workoutsList')}
                </p>
              </div>
            </div>
            <DataTable data={workouts} columns={columns} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

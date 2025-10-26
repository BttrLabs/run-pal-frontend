"use client";

import { useUser } from "@/hooks/use-user";
import * as React from "react";
import { Home, LifeBuoy, Dumbbell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "@/i18n/navigation";
import { SneakerMoveIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import ChartActivity from "@/components/charts/activity-chart-1";
import { AddWorkout } from "@/components/dialogs/add-workout-dialog";
import { useWorkouts } from "@/hooks/use-workouts";
import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();
  const { addWorkout } = useWorkouts();
  const { open } = useSidebar();
  const t = useTranslations('Navigation');
  const tApp = useTranslations('App');

  const router = useRouter();

  const data = {
    navMain: [
      {
        name: t('home'),
        url: "/",
        icon: Home,
      },
      {
        name: t('myWorkouts'),
        url: "/workouts",
        icon: Dumbbell,
      },
    ],
  };

  if (!isLoading && !user) {
    router.push("/login");
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <SneakerMoveIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{tApp('title')}</span>
                  <span className="truncate text-gray-500 text-sm">
                    {tApp('tagline')}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <AddWorkout addWorkout={addWorkout} className="w-full" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup {...props}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="help">
                <SidebarMenuButton asChild size="sm">
                  <a href="mailto:help@jannisarndt.com">
                    <LifeBuoy />
                    <span>{t('support')}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {open && <ChartActivity />}
        {isLoading || !user ? (
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        ) : (
          <NavUser user={user} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

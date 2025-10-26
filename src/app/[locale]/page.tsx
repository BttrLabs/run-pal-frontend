import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChartDistanceLine } from "@/components/charts/line-chart-1";
import { CumulativeDistanceChartInteractive } from "@/components/charts/line-chart-2";
import { TotalIntervalsChart } from "@/components/charts/bar-chart-1";
import { ChartSpeed } from "@/components/charts/chart-speed";
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('Navigation');
  
  // Enable static rendering
  setRequestLocale(locale);

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
                  <BreadcrumbPage>{t('home')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <ChartDistanceLine />
            <ChartSpeed />
            <TotalIntervalsChart />
          </div>
          <CumulativeDistanceChartInteractive />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useDistance } from "@/hooks/use-distance"; // adjust path
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Cumulative distance line chart";

const chartConfig: ChartConfig = {
  distance: { label: "Distance", color: "var(--chart-1)" },
};

export function ChartDistanceLine({ days }: { days?: number }) {
  const { data, isLoading } = useDistance(days);
  const t = useTranslations('Charts');
  const tCommon = useTranslations('Common');

  const formattedData = data.map((d) => ({
    date: d.date,
    distance: d.total_distance,
  }));

  if (isLoading) return <div>{tCommon('loading')}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('distanceChart')}</CardTitle>
        <CardDescription>
          {days ? t('lastDays', { days }) : t('allTime')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={formattedData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="distance"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {t('trendingUpBy')} {data[data.length - 1]?.trend?.toFixed(1) ?? 0}% {t('thisPeriod')}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {t('showingCumulativeDistance')}
        </div>
      </CardFooter>
    </Card>
  );
}

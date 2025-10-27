"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useDistance } from "@/hooks/use-distance";
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

export const description = "Distance line chart";

const chartConfig: ChartConfig = {
  distance: { label: "Distance", color: "var(--chart-1)" },
};

export function ChartDistanceLine({ days = 7 }: { days?: number }) {
  const { data, trend, isLoading } = useDistance(days);
  const t = useTranslations("Charts");
  const tCommon = useTranslations("Common");

  if (isLoading) return <div>{tCommon("loading")}</div>;

  const formattedData = data.map((d) => ({
    date: d.date,
    distance: d.total_distance,
  }));

  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  const trendText = trend >= 0 ? t("trendingUpBy") : t("trendingDownBy");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("distanceChart")}</CardTitle>
        <CardDescription>
          {t("lastDays", { days })}
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
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="distance"
              type="natural"
              stroke={chartConfig.distance.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {trendText} {Math.abs(trend).toFixed(1)}% {t("thisWeek")}
          <TrendIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {t("showingTotalDistance")}
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { useCount } from "@/hooks/use-count";

export const description = "A dynamic bar chart";

export function TotalIntervalsChart({ days = 7 }: { days?: number }) {
  const { data, trend, isLoading } = useCount(days);
  const t = useTranslations("Charts");
  const tCommon = useTranslations("Common");

  const chartConfig = {
    count: {
      label: t("intervals"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  if (isLoading) return <div>{tCommon("loading")}</div>;

  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  const trendText = trend >= 0 ? t("trendingUpBy") : t("trendingDownBy");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("totalIntervals")}</CardTitle>
        <CardDescription>{t("lastDays", { days })}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {trendText} {Math.abs(trend).toFixed(1)}% {t("thisDay")}
          <TrendIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {t("showingTotalIntervals")}
        </div>
      </CardFooter>
    </Card>
  );
}

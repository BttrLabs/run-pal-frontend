"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCumulativeDistance } from "@/hooks/use-cumulative-distance";

export const description = "Cumulative distance over time";

export function CumulativeDistanceChartInteractive({
  days = 30,
}: {
  days?: number;
}) {
  const { data: chartData, isLoading } = useCumulativeDistance(days);
  const t = useTranslations("Charts");
  const tCommon = useTranslations("Common");

  const chartConfig = {
    cumulative_distance: {
      label: t("cumulativeDistance"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.cumulative_distance, 0),
    [chartData],
  );

  const [activeChart] = React.useState<keyof typeof chartConfig>(
    "cumulative_distance",
  );

  if (isLoading) return <div>{tCommon("loading")}</div>;

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>{t("cumulativeDistance")}</CardTitle>
          <CardDescription>{t("totalDistance", { days })}</CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {t("cumulative")}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="cumulative_distance"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={chartConfig[activeChart].color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

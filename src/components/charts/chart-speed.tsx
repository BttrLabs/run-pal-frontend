"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSpeedStats } from "@/hooks/use-speed-stats";

export function ChartSpeed() {
  const { data, trend, isLoading } = useSpeedStats(7);
  const t = useTranslations("Charts");
  const tCommon = useTranslations("Common");

  if (isLoading) return <div>{tCommon("loading")}</div>;

  const chartData = data.map((d) => ({
    day: d.day,
    avg_speed: Math.round(Number(d.avg_speed) * 1000) / 1000,
  }));

  const chartConfig = {
    avg_speed: {
      label: t("avgSpeedLabel"),
      color: "var(--chart-1)",
    },
  };

  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  const trendText =
    trend >= 0 ? `+${trend.toFixed(1)}%` : `${trend.toFixed(1)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("averageSpeed")}</CardTitle>
        <CardDescription>{t("last7Days")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
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
              dataKey="avg_speed"
              type="natural"
              stroke={chartConfig.avg_speed.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {trendText} <TrendIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {t("averageSpeedTrend")}: today vs yesterday
        </div>
      </CardFooter>
    </Card>
  );
}

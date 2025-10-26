"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
} from "@/components/kibo-ui/contribution-graph";
import { eachDayOfInterval, subDays, formatISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWorkouts } from "@/hooks/use-workouts";

const ChartActivity = () => {
  const { workouts } = useWorkouts();
  const now = new Date();

  const days = eachDayOfInterval({
    start: subDays(now, 90),
    end: now,
  });

  // Count workouts per day
  const workoutMap: Record<string, number> = {};
  workouts.forEach((w) => {
    const date = formatISO(new Date(w.createdAt), { representation: "date" });
    workoutMap[date] = (workoutMap[date] || 0) + 1;
  });

  const data = days.map((date) => {
    const iso = formatISO(date, { representation: "date" });
    const count = workoutMap[iso] || 0;

    // Scale level 0–4, but avoid small counts showing as too dark
    let level = 0;
    if (count > 0) {
      // optional: max count = 5 to cap intensity
      const fraction = Math.min(count / 5, 1);
      if (fraction <= 0.25) level = 1;
      else if (fraction <= 0.5) level = 2;
      else if (fraction <= 0.75) level = 3;
      else level = 4;
    }

    return { date: iso, count, level };
  });

  const totalCount = workouts.length;

  return (
    <ContributionGraph data={data} className="p-2">
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
            className={cn(
              'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
              'data-[level="1"]:fill-[#79A2FF] dark:data-[level="1"]:fill-[#79A2FF]',
              'data-[level="2"]:fill-[#407BFF] dark:data-[level="2"]:fill-[#407BFF]',
              'data-[level="3"]:fill-[#2165FF] dark:data-[level="3"]:fill-[#2165FF]',
              'data-[level="4"]:fill-[#004FFF] dark:data-[level="4"]:fill-[#004FFF]',
            )}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Last 90 days:</span>
          <Badge variant="secondary">{totalCount} workouts</Badge>
        </div>
      </ContributionGraphFooter>
    </ContributionGraph>
  );
};

export default ChartActivity;

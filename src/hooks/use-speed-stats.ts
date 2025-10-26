"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type SpeedDataPoint = {
  day: string;
  avg_speed: number;
  trend?: number; // percent change since previous day
};

export function useSpeedStats(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/speed${query}`;

  const fetcher = async () => {
    try {
      const res = await axios.get<{ data: SpeedDataPoint[] }>(url, {
        withCredentials: true,
      });
      // ensure avg_speed is number
      return res.data.data.map((d) => ({
        day: d.day,
        avg_speed: Number(d.avg_speed),
        trend: d.trend !== undefined ? Number(d.trend) : 0,
      }));
    } catch (err) {
      toast.error("Failed to fetch speed stats");
      console.error(err);
      return [];
    }
  };

  const { data, error, isValidating } = useSWR<SpeedDataPoint[]>(url, fetcher);

  return {
    data: data ?? [],
    isLoading: !data && isValidating,
    error,
  };
}

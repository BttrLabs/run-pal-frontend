"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type SpeedDataPoint = {
  day: string;
  avg_speed: number;
};

export type SpeedStatsResponse = {
  data: SpeedDataPoint[];
  trend: number;
};

export function useSpeedStats(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/speed${query}`;

  const fetcher = async (): Promise<SpeedStatsResponse> => {
    try {
      const res = await axios.get<SpeedStatsResponse>(url, {
        withCredentials: true,
      });
      return {
        data: res.data.data.map((d) => ({
          day: d.day,
          avg_speed: Number(d.avg_speed),
        })),
        trend: Number(res.data.trend),
      };
    } catch (err) {
      toast.error("Failed to fetch speed stats");
      console.error(err);
      return { data: [], trend: 0 };
    }
  };

  const { data, error, isValidating } = useSWR<SpeedStatsResponse>(
    url,
    fetcher,
  );

  return {
    data: data?.data ?? [],
    trend: data?.trend ?? 0,
    isLoading: !data && isValidating,
    error,
  };
}

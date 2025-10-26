"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type CumulativeDistancePoint = {
  date: string;
  cumulative_distance: number;
  trend?: number;
};

export function useCumulativeDistance(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/cumulative-distance${query}`;

  const fetcher = async () => {
    try {
      const res = await axios.get<{ data: CumulativeDistancePoint[] }>(url, {
        withCredentials: true,
      });
      return res.data.data.map((d) => ({
        date: d.date,
        cumulative_distance: Number(d.cumulative_distance),
        trend: d.trend !== undefined ? Number(d.trend) : 0,
      }));
    } catch (err) {
      toast.error("Failed to fetch cumulative distance stats");
      console.error(err);
      return [];
    }
  };

  const { data, error, isValidating } = useSWR<CumulativeDistancePoint[]>(
    url,
    fetcher,
  );

  return {
    data: data ?? [],
    isLoading: !data && isValidating,
    error,
  };
}

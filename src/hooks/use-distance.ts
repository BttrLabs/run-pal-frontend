"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type DistancePoint = {
  date: string;
  total_distance: number;
  trend?: number;
};

export function useDistance(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/distance${query}`;

  const fetcher = async () => {
    try {
      const res = await axios.get<{ data: DistancePoint[] }>(url, {
        withCredentials: true,
      });
      return res.data.data.map((d) => ({
        date: d.date,
        total_distance: Number(d.total_distance),
        trend: d.trend !== undefined ? Number(d.trend) : 0,
      }));
    } catch (err) {
      toast.error("Failed to fetch cumulative distance stats");
      console.error(err);
      return [];
    }
  };

  const { data, error, isValidating } = useSWR<DistancePoint[]>(url, fetcher);

  return {
    data: data ?? [],
    isLoading: !data && isValidating,
    error,
  };
}

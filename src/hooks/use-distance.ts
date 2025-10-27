"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type DistancePoint = {
  date: string;
  total_distance: number;
};

export type DistanceResponse = {
  data: DistancePoint[];
  trend: number;
};

export function useDistance(days: number = 7) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/distance?days=${days}`;

  const fetcher = async (): Promise<DistanceResponse> => {
    try {
      const res = await axios.get<{ data: Array<{ day: string; total_distance: number }>; trend: number }>(url, {
        withCredentials: true,
      });
      return {
        data: res.data.data.map((d) => ({
          date: d.day,
          total_distance: Number(d.total_distance),
        })),
        trend: Number(res.data.trend),
      };
    } catch (err) {
      toast.error("Failed to fetch distance stats");
      console.error(err);
      return { data: [], trend: 0 };
    }
  };

  const { data, error, isValidating } = useSWR<DistanceResponse>(url, fetcher);

  return {
    data: data?.data ?? [],
    trend: data?.trend ?? 0,
    isLoading: !data && isValidating,
    error,
  };
}

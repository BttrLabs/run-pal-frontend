"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type CumulativeDistancePoint = {
  date: string;
  cumulative_distance: number;
};

export type CumulativeDistanceResponse = {
  data: CumulativeDistancePoint[];
  trend: number;
};

export function useCumulativeDistance(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/cumulative-distance${query}`;

  const fetcher = async (): Promise<CumulativeDistanceResponse> => {
    try {
      const res = await axios.get<CumulativeDistanceResponse>(url, {
        withCredentials: true,
      });
      return {
        data: res.data.data.map((d) => ({
          date: d.date,
          cumulative_distance: Number(d.cumulative_distance),
        })),
        trend: Number(res.data.trend),
      };
    } catch (err) {
      toast.error("Failed to fetch cumulative distance stats");
      console.error(err);
      return { data: [], trend: 0 };
    }
  };

  const { data, error, isValidating } = useSWR<CumulativeDistanceResponse>(
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

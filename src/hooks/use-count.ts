"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type CountPoint = {
  date: string;
  count: number;
  trend?: number;
};

export function useCount(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/count${query}`;

  const fetcher = async () => {
    try {
      const res = await axios.get<{ data: CountPoint[] }>(url, {
        withCredentials: true,
      });
      return res.data.data.map((d) => ({
        date: d.date,
        count: Number(d.count),
        trend: d.trend !== undefined ? Number(d.trend) : 0,
      }));
    } catch (err) {
      toast.error("Failed to fetch cumulative distance stats");
      console.error(err);
      return [];
    }
  };

  const { data, error, isValidating } = useSWR<CountPoint[]>(url, fetcher);

  return {
    data: data ?? [],
    isLoading: !data && isValidating,
    error,
  };
}

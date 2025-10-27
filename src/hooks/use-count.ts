"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

export type CountPoint = {
  date: string;
  count: number;
};

export type CountResponse = {
  data: CountPoint[];
  trend: number;
};

export function useCount(days?: number) {
  const query = days ? `?days=${days}` : "";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stats/count${query}`;

  const fetcher = async (): Promise<CountResponse> => {
    try {
      const res = await axios.get<CountResponse>(url, {
        withCredentials: true,
      });
      return {
        data: res.data.data.map((d) => ({
          date: d.date,
          count: Number(d.count),
        })),
        trend: Number(res.data.trend),
      };
    } catch (err) {
      toast.error("Failed to fetch interval count stats");
      console.error(err);
      return { data: [], trend: 0 };
    }
  };

  const { data, error, isValidating } = useSWR<CountResponse>(url, fetcher);

  return {
    data: data?.data ?? [],
    trend: data?.trend ?? 0,
    isLoading: !data && isValidating,
    error,
  };
}

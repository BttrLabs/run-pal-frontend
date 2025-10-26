"use client";

import axios from "axios";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";

export type Interval = {
  workout_id: number;
  interval_number: number;
  distance_m: number;
  time_s: number;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IntervalsResponse = {
  intervals: Interval[];
};

export function useIntervals(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/workouts/${slug}/intervals`;

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get<IntervalsResponse>(url, {
        withCredentials: true,
      });
      return res.data;
    } catch {
      toast.error("Failed to fetch intervals.");
      return null;
    }
  };

  const { data, error, isValidating } = useSWR<IntervalsResponse | null>(
    url,
    fetcher,
  );

  const addInterval = async (
    distance_m: number,
    time_s: number,
    note?: string,
  ) => {
    try {
      await axios.post(
        url,
        { distance_m, time_s, note },
        { withCredentials: true },
      );
      mutate(url);
      toast.success("Interval has been created.");
    } catch (err) {
      toast.error("Failed to create interval.");
      console.error(err);
    }
  };

  const updateInterval = async (
    interval_id: number,
    updates: Partial<Omit<Interval, "id" | "workout_id">>,
  ) => {
    try {
      await axios.put(
        `${url.replace(/\/intervals$/, `/interval/${interval_id}`)}`,
        updates,
        { withCredentials: true },
      );
      mutate(url);
      toast.success("Interval has been updated.");
    } catch (err) {
      toast.error("Failed to update interval.");
      console.error(err);
    }
  };

  const deleteInterval = async (interval_id: number) => {
    try {
      await axios.delete(
        `${url.replace(/\/intervals$/, `/interval/${interval_id}`)}`,
        { withCredentials: true },
      );
      mutate(url);
      toast.success("Interval has been deleted.");
    } catch (err) {
      toast.error("Failed to delete interval.");
      console.error(err);
    }
  };

  return {
    intervals: data?.intervals ?? [],
    isLoading: !data && isValidating,
    error,
    addInterval,
    updateInterval,
    deleteInterval,
  };
}

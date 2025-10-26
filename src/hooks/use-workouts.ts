"use client";

import axios from "axios";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";

export type WorkoutResponse = {
  workout_number: number;
  name: string | null;
  description: string | null;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
};

export type WorkoutsResponse = {
  workouts: WorkoutResponse[];
};

export function useWorkouts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/workouts`;

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get<WorkoutsResponse>(url, {
        withCredentials: true,
      });
      return res.data;
    } catch {
      toast.error("Failed to fetch workouts.");
      return null; // Prevents throwing inside the hook
    }
  };

  const { data, error, isValidating } = useSWR<WorkoutsResponse | null>(
    url,
    fetcher,
  );

  const addWorkout = async (name: string, description: string) => {
    try {
      await axios.post(url, { name, description }, { withCredentials: true });
      mutate(url);
      toast.success("Workout has been created.");
    } catch (err) {
      toast.error("Failed to create workout.");
      console.error(err);
    }
  };

  const copyWorkout = async (slug: string) => {
    try {
      await axios.post(`${url}/${slug}/copy`, {}, { withCredentials: true });
      mutate(url);
      toast.success("Workout has been copied.");
    } catch (err) {
      toast.error("Failed to copy workout.");
      console.error(err);
    }
  };

  const deleteWorkout = async (slug: string) => {
    try {
      await axios.delete(`${url}/${slug}`, { withCredentials: true });
      mutate(url);
      toast.success("Workout has been deleted.");
    } catch (err) {
      toast.error("Failed to delete workout.");
      console.error(err);
    }
  };

  return {
    workouts: data?.workouts ?? [],
    isLoading: !data && isValidating,
    error,
    addWorkout,
    copyWorkout,
    deleteWorkout,
  };
}

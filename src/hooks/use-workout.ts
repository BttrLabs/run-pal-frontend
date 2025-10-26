"use client";

import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import { WorkoutResponse } from "@/hooks/use-workouts";
import { useRouter } from "next/navigation";

const url = `${process.env.NEXT_PUBLIC_API_URL}/workouts`;

export type SingleWorkoutResponse = {
  workout: WorkoutResponse;
};

export function useWorkout(slug: string | null) {
  const router = useRouter();

  const fetcher = async (url: string) => {
    if (!slug) throw new Error("No slug");
    try {
      const res = await axios.get<SingleWorkoutResponse>(`${url}`, {
        withCredentials: true,
      });
      return res.data;
    } catch {
      toast.error("Failed to fetch intervals.");
      return null;
    }
  };

  const {
    data,
    error,
    mutate: localMutate,
  } = useSWR<SingleWorkoutResponse | null>(
    slug ? `${url}/${slug}` : null,
    fetcher,
  );

  const editWorkout = async (name: string, description: string) => {
    if (!slug) return;
    try {
      const res = await axios.put<SingleWorkoutResponse>(
        `${url}/${slug}`,
        { name, description },
        { withCredentials: true },
      );

      await localMutate(res.data, { revalidate: false });

      // push to new slug if it changed
      if (res.data.workout.slug !== slug) {
        router.push(`/workouts/${res.data.workout.slug}`);
      }

      toast.success("Workout updated.");
      return res.data.workout;
    } catch (err) {
      toast.error("Failed to update workout.");
      console.error(err);
    }
  };

  return {
    workout: data?.workout ?? null,
    isLoading: !data && !error,
    error,
    editWorkout,
  };
}

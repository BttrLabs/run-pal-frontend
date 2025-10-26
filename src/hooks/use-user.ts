"use client";

import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export function useUser() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`;

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get<{ user: User | null }>(url, {
        withCredentials: true,
      });
      return res.data.user;
    } catch {
      const message = "Failed to fetch user.";
      toast.error(message);
      return null; // prevents hook from throwing
    }
  };

  const { data, error, isValidating } = useSWR<User | null>(url, fetcher);

  return {
    user: data,
    isLoading: !data && isValidating,
    error, // optional: component can react if needed
  };
}

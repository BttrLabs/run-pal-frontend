import { z } from "zod";

export const intervalSchema = z.object({
  interval_number: z.number(),
  distance_m: z.number(),
  time_s: z.number(),
  note: z.string().nullable(),
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
});

export type Interval = z.infer<typeof intervalSchema>;
export const intervalsSchema = z.array(intervalSchema);

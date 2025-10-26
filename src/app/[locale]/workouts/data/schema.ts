import { z } from "zod";

export const workoutSchema = z.object({
  workout_number: z.number(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  slug: z.string().nullable(),
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
});

export type Workout = z.infer<typeof workoutSchema>;
export const workoutsSchema = z.array(workoutSchema);

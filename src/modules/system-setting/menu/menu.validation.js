import { z } from "zod";

export const createMenuSchema = z.object({
  code: z.string().min(3),
  name: z.string().min(5),
  type: z.string().min(1),
  level: z.string().min(1),
});

export const updateMenuSchema =
  createMenuSchema.partial();
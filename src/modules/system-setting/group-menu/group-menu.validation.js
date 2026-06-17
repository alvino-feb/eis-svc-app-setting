import { z } from "zod";

export const createGroupMenuSchema = z.object({
  code: z.string().min(3),
  name: z.string().min(5),
});

export const updateGroupMenuSchema =
  createGroupMenuSchema.partial();
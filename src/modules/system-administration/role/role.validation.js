import { z } from "zod";

export const createRoleSchema = z.object({
  businessId: z.string().uuid(),
  code: z.string().min(3),
  name: z.string().min(5),
});

export const updateRoleSchema =
  createRoleSchema.partial();
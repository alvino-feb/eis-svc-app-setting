import { z } from "zod";

export const createUserMenuSchema = z.object({
  userId: z.string().min(36),
  menuCode: z.string().min(7),
  businessId: z.string().min(36),
  businessMemberId: z.string().min(36),
});

export const updateUserMenuSchema =
  createUserMenuSchema.partial();
import { z } from "zod";

export const createBusinessMemberSchema = z.object({
  businessId: z.string().uuid(),
  code: z.string().min(3),
  name: z.string().min(5),
  type: z.string().min(1),

  phone: z.string().optional(),
  address: z.string().optional(),
  url: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateBusinessMemberSchema =
  createBusinessMemberSchema.partial();
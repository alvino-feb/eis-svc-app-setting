import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().min(3),
  type: z.string().min(1),
  ownerName: z.string().min(3),

  phone: z.string().optional(),
  address: z.string().optional(),
  nation: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateBusinessSchema =
  createBusinessSchema.partial();
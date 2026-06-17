import { z } from "zod";

export const createUserBusinessMemberchema = z.object({
  businessId: z.string().uuid(),
  code: z.string().min(3),
  name: z.string().min(5),
});

export const updateUserBusinessMemberSchema =
  createUserBusinessMemberchema.partial();
import { z } from "zod";

// Base response
// This type is for craeting database response variants of the below types
const baseResponseSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type BaseResponse = z.infer<typeof baseResponseSchema>;

// UserInput
export const userInputZodSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  referralCode: z.string(),
  referralStatus: z.enum(["PENDING", "CONVERTED"]).default("PENDING"),
  credits: z.number().default(0),
  referrerId: z.string().optional(),
});
export type UserInput = z.infer<typeof userInputZodSchema>;

// User
export const userZodSchema = userInputZodSchema.safeExtend(baseResponseSchema.shape);
export type UserType = z.infer<typeof userZodSchema>;

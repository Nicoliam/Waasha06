import { z } from 'zod';

/** Normalise email: trim + lowercase — used before uniqueness checks. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const emailSchema = z.string().trim().email().max(254).transform(normalizeEmail);
const passwordSchema = z.string().min(8).max(128);

export const customerRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().min(1).max(80).optional(),
  displayName: z.string().trim().min(1).max(120).optional(),
});

export const providerRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: z.string().trim().min(1).max(120).optional(),
  tierCode: z.enum(['T1', 'T2', 'T3']),
  bio: z.string().trim().max(2000).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});

export type CustomerRegisterInput = z.infer<typeof customerRegisterSchema>;
export type ProviderRegisterInput = z.infer<typeof providerRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

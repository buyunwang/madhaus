import { z } from 'zod';

const TierSchema = z.object({
  id: z.string(),
  label: z.string(),
  rate: z.number().min(0).max(1),
});

export const CashbackConfigSchema = z.object({
  program_name: z.string(),
  currency: z.string(),
  max_monthly_cashback_cap: z.number().positive(),
  period: z.string(),
  tiers: z.array(TierSchema),
});

export type CashbackConfig = z.infer<typeof CashbackConfigSchema>;
export type CashbackTier = z.infer<typeof TierSchema>;

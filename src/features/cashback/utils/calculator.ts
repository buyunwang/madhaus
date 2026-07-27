import { CashbackConfig } from '../../../data/schema';

export function calculateTierCashback(wager: number, rate: number): number {
  if (wager < 0) return 0;
  return wager * rate;
}

export interface CalculationResult {
  rawTotal: number;
  cappedTotal: number;
  isCapped: boolean;
  capUsagePercentage: number;
  remainingPotential: number;
  tierBreakdown: Record<string, number>;
}

export function calculateTotalCashback(
  wagers: Record<string, number>,
  config: CashbackConfig
): CalculationResult {
  let rawTotal = 0;
  const tierBreakdown: Record<string, number> = {};

  for (const tier of config.tiers) {
    const wager = wagers[tier.id] || 0;
    const cashback = calculateTierCashback(wager, tier.rate);
    tierBreakdown[tier.id] = cashback;
    rawTotal += cashback;
  }

  const cappedTotal = Math.min(rawTotal, config.max_monthly_cashback_cap);
  const isCapped = rawTotal >= config.max_monthly_cashback_cap;
  const capUsagePercentage = Math.min(100, (rawTotal / config.max_monthly_cashback_cap) * 100);
  const remainingPotential = Math.max(0, config.max_monthly_cashback_cap - rawTotal);

  return {
    rawTotal,
    cappedTotal,
    isCapped,
    capUsagePercentage,
    remainingPotential,
    tierBreakdown,
  };
}

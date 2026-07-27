import { CashbackConfigSchema } from '../src/data/schema';

describe('CashbackConfigSchema', () => {
  it('should validate a valid config', () => {
    const validConfig = {
      program_name: 'Bracco Sports Cashback',
      currency: 'USD',
      max_monthly_cashback_cap: 1000,
      period: 'monthly',
      tiers: [
        {
          id: 'straight',
          label: 'Straight Bet',
          rate: 0.005,
        },
      ],
    };

    const result = CashbackConfigSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it('should reject a config with missing fields', () => {
    const invalidConfig = {
      program_name: 'Bracco Sports Cashback',
      // Missing currency, max_monthly_cashback_cap, etc.
    };

    const result = CashbackConfigSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });

  it('should reject negative cap', () => {
    const invalidConfig = {
      program_name: 'Test',
      currency: 'USD',
      max_monthly_cashback_cap: -100,
      period: 'monthly',
      tiers: [],
    };

    const result = CashbackConfigSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });

  it('should reject negative rates or rates > 1', () => {
    const invalidConfig = {
      program_name: 'Test',
      currency: 'USD',
      max_monthly_cashback_cap: 1000,
      period: 'monthly',
      tiers: [
        { id: 'tier1', label: 'Tier 1', rate: -0.1 },
        { id: 'tier2', label: 'Tier 2', rate: 1.5 },
      ],
    };

    const result = CashbackConfigSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });
});

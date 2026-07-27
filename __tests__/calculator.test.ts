import { calculateTierCashback, calculateTotalCashback } from '../src/features/cashback/utils/calculator';
import { CashbackConfig } from '../src/data/schema';

describe('Calculator', () => {
  const mockConfig: CashbackConfig = {
    program_name: 'Test',
    currency: 'USD',
    max_monthly_cashback_cap: 1000,
    period: 'monthly',
    tiers: [
      { id: 'tier1', label: 'Tier 1', rate: 0.01 }, // 1%
      { id: 'tier2', label: 'Tier 2', rate: 0.05 }, // 5%
    ],
  };

  describe('calculateTierCashback', () => {
    it('should correctly calculate cashback', () => {
      expect(calculateTierCashback(100, 0.01)).toBe(1);
      expect(calculateTierCashback(100, 0.05)).toBe(5);
    });

    it('should return 0 for negative wagers', () => {
      expect(calculateTierCashback(-100, 0.01)).toBe(0);
    });
  });

  describe('calculateTotalCashback', () => {
    it('should calculate total and breakdowns correctly', () => {
      const wagers = {
        tier1: 1000, // 1000 * 0.01 = 10
        tier2: 500,  // 500 * 0.05 = 25
      };

      const result = calculateTotalCashback(wagers, mockConfig);

      expect(result.rawTotal).toBe(35);
      expect(result.cappedTotal).toBe(35);
      expect(result.isCapped).toBe(false);
      expect(result.remainingPotential).toBe(965);
      expect(result.capUsagePercentage).toBeCloseTo(3.5);
      expect(result.tierBreakdown).toEqual({
        tier1: 10,
        tier2: 25,
      });
    });

    it('should apply the max cap correctly', () => {
      const wagers = {
        tier2: 30000, // 30000 * 0.05 = 1500 (over 1000 cap)
      };

      const result = calculateTotalCashback(wagers, mockConfig);

      expect(result.rawTotal).toBe(1500);
      expect(result.cappedTotal).toBe(1000);
      expect(result.isCapped).toBe(true);
      expect(result.remainingPotential).toBe(0);
      expect(result.capUsagePercentage).toBe(100);
    });
  });
});

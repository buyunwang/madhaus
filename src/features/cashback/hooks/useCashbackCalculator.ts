import { useState, useMemo, useCallback } from 'react';
import { CashbackConfig } from '../../../data/schema';
import { calculateTotalCashback, CalculationResult } from '../utils/calculator';

export function useCashbackCalculator(config: CashbackConfig | null) {
  const [wagers, setWagers] = useState<Record<string, number>>({});

  const handleWagerChange = useCallback((tierId: string, value: number) => {
    setWagers((prev) => ({
      ...prev,
      [tierId]: Math.max(0, value),
    }));
  }, []);

  const resetWagers = useCallback(() => {
    setWagers({});
  }, []);

  const applyPreset = useCallback((presetWagers: Record<string, number>) => {
    setWagers(presetWagers);
  }, []);

  const result: CalculationResult | null = useMemo(() => {
    if (!config) return null;
    return calculateTotalCashback(wagers, config);
  }, [wagers, config]);

  return {
    wagers,
    handleWagerChange,
    resetWagers,
    applyPreset,
    result,
  };
}

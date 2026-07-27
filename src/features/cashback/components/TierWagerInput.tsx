import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InputGroup } from '../../../ui/molecules/InputGroup';
import { Badge } from '../../../ui/atoms/Badge';
import { spacing } from '../../../ui/tokens';
import { CashbackTier } from '../../../data/schema';

interface TierWagerInputProps {
  tier: CashbackTier;
  value: number;
  onValueChange: (tierId: string, value: number) => void;
  currency: string;
  maxMonthlyCap: number;
}

export const TierWagerInput = React.memo(function TierWagerInput({ tier, value, onValueChange, currency, maxMonthlyCap }: TierWagerInputProps) {
  const currencyPrefix = currency === 'USD' ? '$' : currency;

  // Calculate the wager amount required to exactly hit the monthly cap
  // This allows the user to drag the slider to exactly 100% of the cap
  const maximumValue = tier.rate > 0 ? Math.ceil(maxMonthlyCap / tier.rate) : 10000;

  return (
    <View style={styles.container}>
      <InputGroup
        label={tier.label}
        badge={<Badge label={`${(tier.rate * 100).toFixed(1)}%`} />}
        value={value}
        onValueChange={(val) => onValueChange(tier.id, val)}
        maximumValue={maximumValue}
        currencyPrefix={currencyPrefix}
        accessibilityLabel={`Adjust ${tier.label} wager amount`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs,
  },
});

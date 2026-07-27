import { View, StyleSheet } from 'react-native';
import { Text } from '../../../ui/atoms/Text';
import { StatDisplay } from '../../../ui/molecules/StatDisplay';
import { formatCurrency } from '../../../utils/formatCurrency';
import { spacing, colors } from '../../../ui/tokens';

interface EstimatedRewardsProps {
  totalCashback: number;
  currency: string;
}

export function EstimatedRewards({ totalCashback, currency }: EstimatedRewardsProps) {
  const annualProjection = totalCashback * 12;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headingMd" style={styles.headerTitle}>
          Estimated Rewards
        </Text>
      </View>

      <StatDisplay
        label="Monthly Cashback"
        value={formatCurrency(totalCashback, currency)}
        valueVariant="moneyLg"
        valueColor="positive"
        style={styles.mainStat}
      />

      <View style={styles.divider} />

      <StatDisplay
        label="Annual Projection"
        value={formatCurrency(annualProjection, currency)}
        valueVariant="money"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    marginBottom: 0,
  },
  mainStat: {
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderCard,
    marginBottom: spacing.lg,
  },
});

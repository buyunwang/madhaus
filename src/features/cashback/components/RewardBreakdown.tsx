import { View, StyleSheet } from 'react-native';
import { Text } from '../../../ui/atoms/Text';
import { ProgressBar } from '../../../ui/atoms/ProgressBar';
import { spacing, colors } from '../../../ui/tokens';
import { formatCurrency } from '../../../utils/formatCurrency';

interface RewardBreakdownProps {
  breakdown: Record<string, number>;
  maxCap: number;
}

const TIER_CONFIG = [
  { id: 'straight', label: 'Straight Bet', color: colors.brandOrange },
  { id: 'parlay_2', label: '2-Leg Parlay', color: colors.positive },
  { id: 'parlay_3_plus', label: '3-Leg Parlay', color: colors.info },
];

export function RewardBreakdown({ breakdown, maxCap }: RewardBreakdownProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>Reward Breakdown</Text>

      <View style={styles.listContainer}>
        {TIER_CONFIG.map((tier) => {
          const amount = breakdown[tier.id] || 0;
          const percentage = maxCap > 0 ? Math.min(100, (amount / maxCap) * 100) : 0;

          return (
            <View key={tier.id} style={styles.row}>
              <View style={styles.rowHeader}>
                <Text variant="body" color="textSecondary">{tier.label}</Text>
                <Text variant="body" color="textPrimary">{formatCurrency(amount, 'USD')}</Text>
              </View>

              <ProgressBar 
                progress={percentage} 
                color="#e8682a" 
                backgroundColor="rgba(255, 255, 255, 0.05)"
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.md,
  },
  listContainer: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'column',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
});

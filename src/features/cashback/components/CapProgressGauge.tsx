import { View, StyleSheet } from 'react-native';
import { Text } from '../../../ui/atoms/Text';
import { ProgressBar } from '../../../ui/atoms/ProgressBar';
import { formatCurrency } from '../../../utils/formatCurrency';
import { spacing, colors } from '../../../ui/tokens';

interface CapProgressGaugeProps {
  currentTotal: number;
  maxCap: number;
  currency: string;
}

export function CapProgressGauge({ currentTotal, maxCap, currency }: CapProgressGaugeProps) {
  const progressPercentage = Math.min(100, (currentTotal / maxCap) * 100);
  const isCapped = currentTotal >= maxCap;

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: maxCap, now: currentTotal }}
    >
      <View style={styles.header}>
        <Text variant="label">Monthly Cap Progress</Text>
        <Text variant="label" color={isCapped ? 'brandOrange' : 'textSecondary'}>
          {formatCurrency(currentTotal, currency)} / {formatCurrency(maxCap, currency)}
        </Text>
      </View>
      <ProgressBar
        progress={progressPercentage}
        color={isCapped ? colors.brandOrange : colors.positive}
      />
      {isCapped && (
        <Text variant="caption" color="brandOrange" style={styles.warningText}>
          You&apos;ve reached the maximum monthly cashback cap.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  warningText: {
    marginTop: spacing.sm,
    textAlign: 'right',
  },
});

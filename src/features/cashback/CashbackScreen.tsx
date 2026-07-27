import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { getCashbackConfig } from '../../data/cashbackService';
import { CashbackConfig } from '../../data/schema';
import { useCashbackCalculator } from './hooks/useCashbackCalculator';

import { Text } from '../../ui/atoms/Text';
import { Card } from '../../ui/atoms/Card';
import { BraccoLogo } from '../../ui/atoms/BraccoLogo';
import { EstimatedRewards } from './components/EstimatedRewards';
import { TierWagerInput } from './components/TierWagerInput';
import { CapProgressGauge } from './components/CapProgressGauge';
import { RewardBreakdown } from './components/RewardBreakdown';
import { colors, spacing } from '../../ui/tokens';

export function CashbackScreen() {
  const [config, setConfig] = useState<CashbackConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await getCashbackConfig();
        setConfig(data);
      } catch (err) {
        setError('Failed to load cashback configuration.');
        console.error(err);
      }
    }
    fetchConfig();
  }, []);

  const { wagers, handleWagerChange, result } = useCashbackCalculator(config);

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text color="negative">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!config || !result) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.brandOrange} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Web / App Shell Header Bar */}
      <View style={styles.topNav}>
        <BraccoLogo width={128} height={24.4} color="#e8e8e8" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headingLg" style={styles.title}>
            {config.program_name}
          </Text>
          <Text variant="body" color="textPrimary" style={styles.subtitle}>
            Get rewarded for every play. Unlike a one-time bonus, our cashback program gives you an ongoing return on every wager, deposited directly into your bonus balance.
          </Text>
        </View>

        <Text variant="headingMd" style={styles.sectionTitle}>
          Cashback Calculator
        </Text>

        {/* Tier Wager Inputs Wrapped in Card */}
        <Card style={styles.inputsCard}>
          {config.tiers.map((tier, index) => (
            <React.Fragment key={tier.id}>
              {index > 0 && <View style={styles.tierDivider} />}
              <TierWagerInput
                tier={tier}
                value={wagers[tier.id] || 0}
                onValueChange={handleWagerChange}
                currency={config.currency}
                maxMonthlyCap={config.max_monthly_cashback_cap}
              />
            </React.Fragment>
          ))}
        </Card>

        {/* Monthly Cap Progress Gauge */}
        <CapProgressGauge
          currentTotal={result.rawTotal}
          maxCap={config.max_monthly_cashback_cap}
          currency={config.currency}
        />

        {/* Reward Breakdown */}
        <RewardBreakdown
          breakdown={result.tierBreakdown}
          maxCap={config.max_monthly_cashback_cap}
        />

        {/* Estimated Rewards at the Bottom */}
        <EstimatedRewards
          totalCashback={result.cappedTotal}
          currency={config.currency}
        />

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  topNav: {
    height: 53,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderCard,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    lineHeight: 22,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
  inputsCard: {
    marginBottom: spacing.xl,
  },
  tierDivider: {
    height: 1,
    backgroundColor: colors.borderCard,
    marginVertical: spacing.lg,
  },
  footerSpacer: {
    height: spacing['3xl'],
  },
});

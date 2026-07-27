import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Text } from '../atoms/Text';
import { spacing, ColorToken } from '../tokens';

interface StatDisplayProps extends ViewProps {
  label: string;
  value: string;
  labelColor?: string; // e.g. 'textSecondary'
  valueColor?: string; // e.g. 'textPrimary'
  valueVariant?: 'headingLg' | 'headingMd' | 'money' | 'moneyLg';
}

export function StatDisplay({
  label,
  value,
  labelColor = 'textSecondary',
  valueColor = 'textPrimary',
  valueVariant = 'money',
  style,
  ...props
}: StatDisplayProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text variant="label" color={labelColor as ColorToken} style={styles.label}>
        {label}
      </Text>
      <Text variant={valueVariant} color={valueColor as ColorToken}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: spacing.xs,
  },
});

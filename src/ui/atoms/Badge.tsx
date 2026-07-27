import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Text } from './Text';
import { colors, radii, spacing } from '../tokens';

interface BadgeProps extends ViewProps {
  label: string;
}

export function Badge({ label, style, ...props }: BadgeProps) {
  return (
    <View style={[styles.badge, style]} {...props}>
      <Text variant="caption" color="textPrimary" style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.brandOrange,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.xl,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
});

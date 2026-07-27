import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../tokens';

interface CardProps extends ViewProps {
  padding?: keyof typeof spacing;
}

export function Card({ padding = 'lg', style, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding: spacing[padding] },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderCard,
  },
});

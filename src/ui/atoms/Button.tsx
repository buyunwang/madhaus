import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, radii, spacing } from '../tokens';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'filled' | 'outlined';
}

export function Button({ title, variant = 'filled', style, ...props }: ButtonProps) {
  const isFilled = variant === 'filled';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        isFilled ? styles.filled : styles.outlined,
        style,
      ]}
      accessibilityRole="button"
      {...props}
    >
      <Text
        variant="bodyLg"
        color={isFilled ? 'textPrimary' : 'brandOrange'}
        align="center"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.brandOrange,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brandOrange,
  },
});

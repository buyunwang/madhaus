import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { colors, radii, spacing, typography } from '../tokens';
import { Text } from './Text';

interface TextInputProps extends RNTextInputProps {
  prefix?: string;
}

export function TextInput({ prefix, style, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      {prefix && (
        <Text variant="bodyLg" style={styles.prefix}>
          {prefix}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, prefix && styles.inputWithPrefix, style]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    ...typography.bodyLg,
    color: colors.textPrimary,
    paddingVertical: spacing.md,
    flex: 1,
  },
  prefix: {
    flex: 0,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  inputWithPrefix: {
    paddingLeft: 0,
  },
});

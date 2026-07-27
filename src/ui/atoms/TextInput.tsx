import React, { useState } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { colors, radii, spacing, typography } from '../tokens';
import { Text } from './Text';

interface TextInputProps extends RNTextInputProps {
  prefix?: string;
}

export function TextInput({ prefix, style, onFocus, onBlur, ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      {prefix && (
        <Text variant="bodyLg" style={styles.prefix}>
          {prefix}
        </Text>
      )}
      <RNTextInput
        style={[
          styles.input, 
          prefix && styles.inputWithPrefix, 
          style, 
          { outlineStyle: 'none' } as any
        ]}
        placeholderTextColor={colors.textMuted}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
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
  containerFocused: {
    borderColor: colors.brandOrangeLight,
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

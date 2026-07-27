import React, { useState } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Text } from '../atoms/Text';
import { Slider } from '../atoms/Slider';
import { TextInput } from '../atoms/TextInput';
import { spacing } from '../tokens';

interface InputGroupProps extends ViewProps {
  label: string;
  badge?: React.ReactNode;
  value: number;
  onValueChange: (value: number) => void;
  maximumValue?: number;
  currencyPrefix?: string;
}

export function InputGroup({
  label,
  badge,
  value,
  onValueChange,
  maximumValue = 10000,
  currencyPrefix = '$',
  style,
  ...props
}: InputGroupProps) {
  const [localText, setLocalText] = useState(value.toString());
  const [lastValue, setLastValue] = useState(value);

  // Sync external value changes (like from the slider) to local text state
  if (value !== lastValue) {
    setLastValue(value);
    const parsedLocal = parseFloat(localText);
    if (isNaN(parsedLocal) || parsedLocal !== value) {
      setLocalText(value.toString());
    }
  }

  const handleTextChange = (text: string) => {
    // Keep only numbers and decimals
    const sanitized = text.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points (e.g. "1.2.3" -> "1.23")
    const parts = sanitized.split('.');
    const finalString = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitized;

    setLocalText(finalString);

    if (finalString === '') {
      onValueChange(0);
      return;
    }

    const num = parseFloat(finalString);
    // Only update the parent if it's a valid number and doesn't end in a dot
    // Ending in a dot means the user is still typing decimals
    if (!isNaN(num) && !finalString.endsWith('.')) {
      onValueChange(num);
    }
  };

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text variant="headingSm">{label}</Text>
          {badge}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            prefix={currencyPrefix}
            value={localText}
            onChangeText={handleTextChange}
            keyboardType="decimal-pad"
            style={styles.textInput}
          />
        </View>
      </View>
      
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={0}
        maximumValue={maximumValue}
        step={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  inputWrapper: {
    width: 120,
  },
  textInput: {
    paddingVertical: spacing.sm,
  },
});

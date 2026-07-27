import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { colors, typography, TypographyToken, colors as colorTokens } from '../tokens';

interface TextProps extends RNTextProps {
  variant?: TypographyToken;
  color?: keyof typeof colorTokens;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Text({
  variant = 'body',
  color = 'textPrimary',
  align,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        { color: colors[color] },
        align && { textAlign: align },
        style,
      ]}
      {...props}
    />
  );
}

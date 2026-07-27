import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  headingLg: { fontFamily: 'NunitoSans_800ExtraBold', fontSize: 28, letterSpacing: -0.5 },
  headingMd: { fontFamily: 'NunitoSans_700Bold', fontSize: 22 },
  headingSm: { fontFamily: 'NunitoSans_700Bold', fontSize: 18 },
  bodyLg: { fontFamily: 'NunitoSans_700Bold', fontSize: 16 },
  body: { fontFamily: 'NunitoSans_600SemiBold', fontSize: 14 },
  label: {
    fontFamily: 'NunitoSans_800ExtraBold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  caption: { fontFamily: 'NunitoSans_600SemiBold', fontSize: 11 },
  money: { fontFamily: 'NunitoSans_900Black', fontSize: 24, fontVariant: ['tabular-nums'] },
  moneyLg: { fontFamily: 'NunitoSans_900Black', fontSize: 36, fontVariant: ['tabular-nums'] },
} as const;

export type TypographyToken = keyof typeof typography;

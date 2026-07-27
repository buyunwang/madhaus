export const colors = {
  // Backgrounds
  bgPrimary: '#0D1117',
  bgCard: '#141C26',
  bgCardHover: '#1C2533',

  // Borders
  borderCard: '#2A3142',
  borderInput: '#3A4155',

  // Brand
  brandOrange: '#E8682A',
  brandOrangeLight: '#F59E0B',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',

  // Semantic
  positive: '#10B981',
  negative: '#EF4444',
  info: '#06B6D4',
} as const;

export type ColorToken = keyof typeof colors;

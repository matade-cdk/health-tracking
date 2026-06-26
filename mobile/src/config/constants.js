// App Constants
export const COLORS = {
  primary: '#667eea',
  primaryLight: '#764ba2',
  secondary: '#f093fb',
  accent: '#4facfe',
  danger: '#ff6b6b',
  warning: '#feca57',
  success: '#48dbfb',
  background: '#f8f9ff',
  cardBg: '#ffffff',
  white: '#FFFFFF',
  black: '#2c2c54',
  gray: '#a4b0be',
  lightGray: '#f1f2f6',
  text: '#2f3542',
  textLight: '#57606f',
  border: '#dfe4ea',
  shadow: 'rgba(102, 126, 234, 0.1)',
};

export const GRADIENTS = {
  primary: ['#667eea', '#764ba2'],
  secondary: ['#f093fb', '#f5576c'],
  success: ['#48dbfb', '#0abde3'],
  warm: ['#ffeaa7', '#fab1a0'],
  cool: ['#74b9ff', '#0984e3'],
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const HEALTH_METRICS = {
  BP: {
    name: 'Blood Pressure',
    unit: 'mmHg',
    normalRange: { min: 90, max: 120 },
    icon: '❤️',
  },
  SUGAR: {
    name: 'Blood Sugar',
    unit: 'mg/dL',
    normalRange: { min: 70, max: 140 },
    icon: '🍬',
  },
  HR: {
    name: 'Heart Rate',
    unit: 'bpm',
    normalRange: { min: 60, max: 100 },
    icon: '💓',
  },
  WEIGHT: {
    name: 'Weight',
    unit: 'kg',
    normalRange: { min: 40, max: 100 },
    icon: '⚖️',
  },
  TEMP: {
    name: 'Temperature',
    unit: '°C',
    normalRange: { min: 36, max: 37.5 },
    icon: '🌡️',
  },
  OXYGEN: {
    name: 'Oxygen Level',
    unit: '%',
    normalRange: { min: 95, max: 100 },
    icon: '💨',
  },
};

export const STORAGE_KEYS = {
  USER: '@user',
  TOKEN: '@token',
  HEALTH_RECORDS: '@health_records',
  REMINDERS: '@reminders',
  LANGUAGE: '@language',
  LAST_SYNC: '@last_sync',
};

export const LANGUAGES = {
  EN: 'en',
  HI: 'hi',
};

export default {
  COLORS,
  FONTS,
  SPACING,
  HEALTH_METRICS,
  STORAGE_KEYS,
  LANGUAGES,
};

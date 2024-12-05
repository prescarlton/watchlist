import { StyleSheet } from 'react-native-unistyles'

const SCALE = 0.875

const space = (v: number) => v * 4 * SCALE

const commonTheme = {
  space,
  colors: {
    background: '',
    text: '',
    card: '',
  },
  shadows: {
    md: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
  },
}
type Theme = typeof commonTheme

const lightTheme: Theme = {
  ...commonTheme,
  colors: {
    background: '#f0f0f0',
    text: '#121212',
    card: '#ffffff',
  },
}
const darkTheme: Theme = {
  ...commonTheme,
  colors: {
    background: '#000000',
    text: '#ffffff',
    card: '#1c1c1e',
  },
}

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
})

type AppThemes = {
  light: typeof lightTheme
  dark: typeof darkTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

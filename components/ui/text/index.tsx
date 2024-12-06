import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface TextProps extends RNTextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  bold?: boolean
}
export function Text({ size = 'md', bold = false, ...props }: TextProps) {
  return (
    <RNText
      {...props}
      style={[styles.base, styles[size], props.style, bold && styles.bold]}
    />
  )
}

const styles = StyleSheet.create((theme) => ({
  base: {
    color: theme.colors.text,
  },
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
    lineHeight: 22,
  },
  lg: {
    fontSize: 18,
  },
  xl: {
    fontSize: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
}))

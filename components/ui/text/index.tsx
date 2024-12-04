import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface TextProps extends RNTextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  bold?: boolean
}
export const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  TextProps
>(({ size = 'md', bold = false, ...props }, ref) => {
  return (
    <RNText
      {...props}
      style={[styles.base, styles[size], props.style, bold && styles.bold]}
      ref={ref}
    />
  )
})

Text.displayName = 'Text'

const styles = StyleSheet.create({
  base: {
    color: '#fff',
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
})

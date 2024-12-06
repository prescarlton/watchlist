'use client'
import React from 'react'
import { View, ViewProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface DividerProps extends ViewProps {
  orientation?: 'vertical' | 'horizontal'
}

export const Divider = ({ orientation, ...props }: DividerProps) => {
  const style = orientation === 'vertical' ? styles.vertical : styles.horizontal
  return <View {...props} style={[style, props.style]} />
}

const styles = StyleSheet.create((theme) => ({
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.card,
  },
  horizontal: {
    height: 1,
    width: '100%',
    backgroundColor: '#00000020',
  },
}))

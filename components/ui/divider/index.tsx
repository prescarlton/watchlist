'use client'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface DividerProps extends ViewProps {
  orientation?: 'vertical' | 'horizontal'
}

export const Divider = ({ orientation, ...props }: DividerProps) => {
  const style = orientation === 'vertical' ? styles.vertical : styles.horizontal
  return <View {...props} style={[style, props.style]} />
}

const styles = StyleSheet.create({
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: '#ffffff40',
  },
  horizontal: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffffff40',
  },
})

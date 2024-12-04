'use client'
import React, { ReactNode } from 'react'
import type { PressableProps } from 'react-native'
import { Pressable, Text, StyleSheet } from 'react-native'

interface ButtonProps extends PressableProps {
  variant?: 'solid' | 'outline' | 'link' | 'ghost' | 'icon'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = ({ variant = 'solid', ...props }: ButtonProps) => {
  return (
    <Pressable {...props} style={[styles.base, styles[variant], props.style]}>
      <>
        {props.leftIcon}
        {typeof props.children === 'string' ? (
          <Text style={[styles.baseText, styles[variant + 'Text']]}>
            {props.children}
          </Text>
        ) : (
          props.children
        )}
        {props.rightIcon}
      </>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    gap: 8,
    height: 40,
  },
  baseText: {
    fontWeight: 'semibold',
  },
  link: {
    backgroundColor: 'transparent',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  icon: {
    borderRadius: 8,
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    backgroundColor: '#00000050',
  },
})

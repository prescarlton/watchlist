'use client'
import React, { ReactNode } from 'react'
import type { PressableProps } from 'react-native'
import { Pressable, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface ButtonProps extends PressableProps {
  variant?: 'solid' | 'outline' | 'link' | 'ghost' | 'icon'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = ({ variant = 'solid', ...props }: ButtonProps) => {
  return (
    <Pressable {...props} style={[styles[variant], props.style]}>
      <>
        {props.leftIcon}
        {typeof props.children === 'string' ? (
          <Text
            style={{
              ...styles.baseText,
              ...(variant === 'link'
                ? styles.linkText
                : variant === 'outline'
                  ? styles.outlineText
                  : {}),
            }}
          >
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

const styles = StyleSheet.create((theme) => ({
  solid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.space(2),
    paddingHorizontal: theme.space(4),
    gap: theme.space(2),
    height: theme.space(12),
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
    borderRadius: theme.radius.lg,
    width: theme.space(12),
    height: theme.space(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#00000050',
  },
  outline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.background,
    borderRadius: theme.space(2),
    paddingHorizontal: theme.space(4),
    gap: theme.space(2),
    height: theme.space(12),
  },
  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.space(2),
    paddingHorizontal: theme.space(4),
    gap: theme.space(2),
  },
  outlineText: {
    color: theme.colors.background,
  },
}))

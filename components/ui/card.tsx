import { View, ViewProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface CardProps extends ViewProps {}
export default function Card({ style, ...props }: CardProps) {
  return <View style={[styles.container, style]} {...props} />
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.md,
    borderRadius: theme.radius.xl,
  },
}))

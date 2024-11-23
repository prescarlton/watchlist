import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from './ui/box'
import { ReactNode } from 'react'

export default function SafeAreaPage({ children }: { children: ReactNode }) {
  const { top } = useSafeAreaInsets()
  return (
    <Box
      className={`h-full px-4`}
      style={{
        paddingTop: top,
      }}
    >
      {children}
    </Box>
  )
}

import { ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SafeAreaPage({ children }: { children: ReactNode }) {
  const { top } = useSafeAreaInsets()
  return (
    <View
      style={{
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: top,
      }}
    >
      {children}
    </View>
  )
}

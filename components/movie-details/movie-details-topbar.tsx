import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import { TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'

import { Button } from '@/components/ui/button'

export default function MovieDetailsTopbar({
  showModal,
  saved,
  title,
  scrollOffset,
  headerHeight,
}: {
  showModal: () => void
  saved: boolean
  title: string
  scrollOffset: SharedValue<number>
  headerHeight: number
}) {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
  const { top } = useSafeAreaInsets()
  const onPressBack = () => {
    router.back()
  }
  const onPressBookmark = () => {
    showModal()
  }
  const blurViewStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [Math.round(headerHeight * 0.7), headerHeight * 0.8],
        [0, 1],
      ),
    }
  })
  const titleStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [Math.round(headerHeight * 0.71), headerHeight * 0.8],
        [0, 1],
      ),
    }
  })
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AnimatedBlurView
        intensity={80}
        tint="dark"
        style={[blurViewStyle, styles.blurView]}
      />
      <Button onPress={onPressBack} variant="icon">
        <Ionicons name="chevron-back" size={20} color="white" />
      </Button>
      <Animated.Text
        style={[
          { color: 'white', fontSize: 20, fontWeight: 'bold' },
          titleStyle,
        ]}
      >
        {title}
      </Animated.Text>
      <Button onPress={onPressBookmark} variant="icon">
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color="white"
        />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  blurView: {
    position: 'absolute',
    inset: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
})

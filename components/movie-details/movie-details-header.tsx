import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { TextStyle, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'

export default function MovieDetailsHeader({
  showModal,
  saved,
  scrollOffset,
  headerHeight,
}: {
  showModal: () => void
  saved: boolean
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
    <Box
      className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 pb-4 "
      style={{
        paddingTop: top,
      }}
    >
      <AnimatedBlurView
        intensity={80}
        tint="dark"
        style={[
          {
            position: 'absolute',
            inset: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: top,
            paddingHorizontal: 16,
            paddingBottom: 8,
          },
          blurViewStyle,
        ]}
      />
      <Button
        onPress={onPressBack}
        className="rounded-xl bg-background-muted/70 p-0 w-8 h-8"
      >
        <Feather name="chevron-left" size={20} color="white" />
      </Button>
      <Animated.Text
        style={[
          { color: 'white', fontSize: 20, fontWeight: 'bold' },
          titleStyle,
        ]}
      >
        test
      </Animated.Text>
      <Button
        className="rounded-xl bg-background-muted/70 p-0 w-8 h-8"
        onPress={onPressBookmark}
      >
        <FontAwesome
          name={saved ? 'bookmark' : 'bookmark-o'}
          size={20}
          color="white"
        />
      </Button>
    </Box>
  )
}

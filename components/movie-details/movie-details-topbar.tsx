import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { TextStyle, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'

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
        className="rounded-full bg-background-muted/70 p-0 w-10 h-10"
      >
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
      <Button
        className="rounded-full bg-background-muted/70 p-0 w-10 h-10"
        onPress={onPressBookmark}
      >
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color="white"
        />
      </Button>
    </Box>
  )
}

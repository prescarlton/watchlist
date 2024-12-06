import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import { Pressable } from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface BackdropProps extends BottomSheetBackdropProps {
  onPress: () => void
}

const BottomSheetBackdrop = ({ animatedIndex, onPress }: BackdropProps) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolation.IDENTITY,
    ),
  }))

  const intensity = 40
  return (
    <Pressable onPress={onPress} style={{ position: 'absolute', inset: 0 }}>
      <Animated.View style={[{ flex: 1 }, containerAnimatedStyle]}>
        <AnimatedBlurView
          // {...animatedProps}
          intensity={intensity}
          tint="dark"
          pointerEvents="none"
          style={{ flex: 1 }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default BottomSheetBackdrop

import { useState } from 'react'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { Modal } from 'react-native'
import { Button, ButtonText } from '../ui/button'
import { Pressable } from 'react-native-gesture-handler'
export default function MovieOverview({ overview }: { overview: string }) {
  const [showMore, setShowMore] = useState(false)
  const NUM_CHARS = 130
  const truncatedOverview =
    overview.slice(0, NUM_CHARS) + (overview.length > NUM_CHARS ? '...' : '')

  return (
    <Box className="flex gap-2 mt-2">
      <Pressable onPress={() => setShowMore(true)}>
        <Text className="text-white text-lg">
          {truncatedOverview}
          {overview.length > NUM_CHARS && (
            <Text className="font-extrabold"> MORE</Text>
          )}
        </Text>
      </Pressable>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={false}
        visible={showMore}
        onRequestClose={() => setShowMore(false)}
      >
        <Box className="flex-1 p-4 gap-4 bg-background-dark">
          <Box className="flex-row justify-center items-center">
            <Text className="text-lg font-bold">Overview</Text>
            <Button
              onPress={() => setShowMore(false)}
              variant="link"
              size="lg"
              className="absolute right-0"
            >
              <ButtonText className="text-blue-500">Done</ButtonText>
            </Button>
          </Box>
          <Text className="text-lg px-4">{overview}</Text>
        </Box>
      </Modal>
    </Box>
  )
}

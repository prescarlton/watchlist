import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Text } from '../ui/text'

export default function MovieDetailsHeader({
  showModal,
  saved,
}: {
  showModal: () => void
  saved: boolean
}) {
  const { top } = useSafeAreaInsets()
  const onPressBack = () => {
    router.back()
  }
  const onPressBookmark = () => {
    showModal()
  }
  return (
    <Box
      className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 h-12"
      style={{
        marginTop: top,
      }}
    >
      <Button
        onPress={onPressBack}
        className="rounded-xl bg-background-muted/70 p-0 w-8 h-8"
      >
        <Feather name="chevron-left" size={20} color="white" />
      </Button>
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

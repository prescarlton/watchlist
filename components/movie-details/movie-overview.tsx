import { useState } from 'react'
import { Modal, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
export default function MovieOverview({ overview }: { overview: string }) {
  const [showMore, setShowMore] = useState(false)
  const NUM_CHARS = 130
  const truncatedOverview =
    overview.slice(0, NUM_CHARS) + (overview.length > NUM_CHARS ? '...' : '')

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowMore(true)}>
        <Text style={{ color: 'white' }}>
          {truncatedOverview}
          {overview.length > NUM_CHARS && (
            <Text bold style={{ color: 'white' }}>
              {' '}
              MORE
            </Text>
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
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text bold>Overview</Text>
            <Button
              onPress={() => setShowMore(false)}
              variant="link"
              style={styles.doneButton}
            >
              Done
            </Button>
          </View>
          <Text size="lg" style={styles.overview}>
            {overview}
          </Text>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: 7,
    marginTop: 7,
  },
  modalContent: {
    flex: 1,
    padding: 14,
    gap: 14,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    position: 'absolute',
    right: 0,
  },
  overview: {
    paddingHorizontal: 14,
  },
}))

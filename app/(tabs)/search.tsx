import Page from '@/components/page'
import { Box } from '@/components/ui/box'
import { Input, InputField } from '@/components/ui/input'
import { ScrollView } from 'react-native'

export default function Screen() {
  return (
    <Page>
      <Box className="flex gap-4">
        <Input variant="rounded" className="border-none outline-none">
          <InputField placeholder="Search" />
        </Input>
        <ScrollView className="h-full">
          <Box className="flex-row flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <Box key={index} className="w-24 h-36 bg-gray-300 rounded-md" />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </Page>
  )
}

import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import migrations from '@/db/migrations/migrations'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { db } from '@/db'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { success, error } = useMigrations(db, migrations)
  if (error) {
    return (
      <View style={{ flex: 1, marginTop: 128 }}>
        <Text>Migration error: {error.message}</Text>
        <Text>{JSON.stringify(error.cause)}</Text>
      </View>
    )
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress</Text>
      </View>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movie" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

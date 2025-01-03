import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function AppScreenLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Stack
      // initialRouteName="(drawer)"
      screenOptions={{
        headerStyle: { backgroundColor: colorScheme === 'light' ? '#14b8a6' : '#0d9488' },
      }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="homeDetail" options={{ title: 'Home Details' }} />
      <Stack.Screen name="notiDetail" options={{ title: 'Notification Details' }} />
    </Stack>
  );
}

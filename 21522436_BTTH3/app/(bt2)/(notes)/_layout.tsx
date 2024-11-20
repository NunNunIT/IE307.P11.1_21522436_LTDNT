import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function NoteLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colorScheme === 'light' ? '#14b8a6' : '#0d9488' },
      }}>
      <Stack.Screen name="index" options={{ headerShown: true, title: '' }} />
      <Stack.Screen name="addNote" options={{ headerShown: true, title: 'Add Note' }} />
      <Stack.Screen name="editNote" options={{ headerShown: true, title: 'Edit Note' }} />
    </Stack>
  );
}

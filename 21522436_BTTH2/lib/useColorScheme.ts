import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useCallback } from 'react';

// import { setAndroidNavigationBar } from './android-navigation-bar';

export function useColorScheme() {
  const { colorScheme, setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();
  const safetyColorScheme = colorScheme ?? 'dark';

  const setColorScheme = useCallback((newColorScheme: 'light' | 'dark') => {
    setNativewindColorScheme(newColorScheme);
    // setAndroidNavigationBar(newColorScheme);
    AsyncStorage.setItem('theme', newColorScheme);
  }, []);

  const toggleColorScheme = () => {
    const newTheme = safetyColorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
  };

  return {
    colorScheme: safetyColorScheme,
    isDarkColorScheme: safetyColorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
import { Pressable } from 'react-native';
import { Text } from '../ui/text';
import { useColorScheme } from '@/lib/useColorScheme';

const DarkModeText = () => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="flex items-center justify-end bg-transparent">
      <Text selectable={false} className="text-right">
        {isDarkColorScheme ? 'Dark Mode! 🌙' : 'Light Mode! 🌞'}
      </Text>
    </Pressable>
  );
};

export default DarkModeText;
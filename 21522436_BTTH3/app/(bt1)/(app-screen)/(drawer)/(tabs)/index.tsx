// 21522436 - Nguyễn Thị Hồng Nhung
import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function HomeScreen() {
  const pressHandler = () => {
    router.push('/(bt1)/(app-screen)/homeDetail');
  };
  return (
    <View className="flex h-full items-center justify-center">
      <Text>Home Screen</Text>
      <Button onPress={pressHandler}>
        <Text>Go to Home Detail</Text>
      </Button>
    </View>
  );
}

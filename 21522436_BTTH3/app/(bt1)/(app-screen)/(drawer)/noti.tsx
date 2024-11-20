// 21522436 - Nguyễn Thị Hồng Nhung
import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function NotiScreen() {
  const pressHandler = () => {
    router.push('/(bt1)/(app-screen)/notiDetail')
  };
  return (
    <View className="flex h-full items-center justify-center">
      <Text>Noti Screen</Text>
      <Button onPress={pressHandler}>
        <Text>Go to Noti Detail</Text>
      </Button>
    </View>
  );
}

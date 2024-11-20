import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Page() {
  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-2 bg-white dark:bg-black">
      <Button onPress={() => router.push('/(bt1)/(auth)/login')}>
        <Text>Bài tập 1</Text>
      </Button>
      <Button onPress={() => router.push('/(bt2)/(notes)')}>
        <Text>Bài tập 2</Text>
      </Button>
    </View>
  );
}
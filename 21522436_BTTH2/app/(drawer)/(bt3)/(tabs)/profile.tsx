import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/provider/AuthProvider';

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex h-full items-center justify-center">
      <Text>Favourite Screen</Text>
      <Button onPress={signOut}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

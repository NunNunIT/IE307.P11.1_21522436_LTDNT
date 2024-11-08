// 21522436 - Nguyễn Thị Hồng Nhung
import { Image, View } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

export default function SocialLogin() {
  const handleLoginGoogle = () => {
    console.log('Login with Google');
  };

  const handleLoginFacebook = () => {
    console.log('Login with Facebook');
  };

  return (
    <View className="flex flex-row items-center justify-center gap-3">
      <Button
        variant="outline"
        className="flex w-40 flex-row items-center justify-start gap-2"
        onPress={handleLoginGoogle}>
        <>
          <Image
            source={require('~/assets/google.png')}
            className="aspect-square size-8 overflow-hidden rounded-full"
          />
          <Text>Google</Text>
        </>
      </Button>
      <Button
        variant="outline"
        className="flex w-40 flex-row items-center justify-start gap-2"
        onPress={handleLoginFacebook}>
        <>
          <Image
            source={require('~/assets/facebook.jpg')}
            className="aspect-square size-8 overflow-hidden rounded-full"
          />
          <Text>Facebook</Text>
        </>
      </Button>
    </View>
  );
}

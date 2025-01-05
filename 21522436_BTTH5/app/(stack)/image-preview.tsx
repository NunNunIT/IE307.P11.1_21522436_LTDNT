import { Image, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useCamera } from '~/components/CameraProvider';

export default function ImageReview() {
  const { photoUri } = useCamera();
  return (
    photoUri ? (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.image} />
      </View>
    ) : (
      <View className="flex flex-1 items-center justify-center">
        <Text>
          No image to preview
        </Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

import { Aperture, GalleryThumbnails, ImageOff } from '~/lib/icons';
import { Image, SafeAreaView, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { captureRef } from 'react-native-view-shot';
import { router } from 'expo-router';
import { useCamera } from '~/components/CameraProvider';
import { useRef } from 'react';

export default function Index() {
  const { photoUri, setPhotoUri } = useCamera();
  const imageRef = useRef<View>(null);

  const screenshot = async () => {
    try {
      const localUri = await captureRef(imageRef);
      setPhotoUri(localUri);
    } catch (e: any) {
      console.error(e?.message);
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View
        ref={imageRef}
        className="flex-1 border-2 border-red-500 p-4"
        collapsable={false}>
        {photoUri ? (
          <Image className="flex-1" source={{ uri: photoUri }} />
        ) : (
          <View className="flex flex-1 items-center justify-center">
            <Text>Don't have Photo</Text>
          </View>
        )}
      </View>
      <View className="absolute inset-x-0 bottom-0 h-48">
        <Button
          variant="ghost"
          size="icon"
          onPress={() => setPhotoUri(null)}
          className="absolute left-8 top-1/2 -translate-y-1/2">
          <ImageOff className="text-black dark:text-white" size={48} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onPress={screenshot}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <Aperture className="text-black dark:text-white" size={48} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onPress={() => router.push("/image-preview")}
          className="absolute top-1/2 -translate-y-1/2 right-8">
          <GalleryThumbnails className="text-black dark:text-white" size={48} />
        </Button>
      </View>
    </SafeAreaView>
  );
}

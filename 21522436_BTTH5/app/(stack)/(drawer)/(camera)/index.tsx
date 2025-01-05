import { Alert, AlertTitle } from '@/components/deprecated-ui/alert';
import { AlertCircle, Aperture, GalleryThumbnails, SwitchCamera, Zap, ZapOff } from '~/lib/icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView, Vibration, View } from 'react-native';
import { useRef, useState } from 'react';

import { Button } from '~/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { useCamera } from '~/components/CameraProvider';
import { useFocusEffect } from '@react-navigation/native'; // Import the hook

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isFlashMode, setIsFlashMode] = useState(false);
  const { photoUri, setPhotoUri } = useCamera();
  const cameraRef = useRef<CameraView>(null);

  useFocusEffect(() => {
    setIsCameraVisible(true);

    return () => {
      setIsCameraVisible(false);
      Vibration.cancel();
    };
  });

  const shortVibration = () => Vibration.vibrate(100);

  const shutterVibration = () => Vibration.vibrate([0, 50, 50, 0]);

  if (!permission) {
    return (
      <View>
        <Alert variant="destructive" icon={AlertCircle}>
          <AlertTitle>Can't find the permission</AlertTitle>
        </Alert>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex flex-1">
        <View className="flex flex-1 justify-center px-8">
          <Text className="pb-10 text-center">We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <Text>Grant permission</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
    shortVibration();
  }

  async function takePicture() {
    if (cameraRef.current) {
      shutterVibration();
      const photo = await cameraRef.current.takePictureAsync();
      if (photoUri) URL.revokeObjectURL(photoUri);
      setPhotoUri(photo?.uri ?? null);
    }
  }

  const FlashIcon = isFlashMode ? Zap : ZapOff;

  return (
    <SafeAreaView className="flex flex-1">
      {isCameraVisible && (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          ref={cameraRef}
          flash={isFlashMode ? 'on' : 'off'}>
          <Button
            variant="ghost"
            size="icon"
            onPress={() => setIsFlashMode((prev) => !prev)}
            className="absolute left-3.5 top-3.5">
            <FlashIcon className="size-14 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onPress={toggleCameraFacing}
            className="absolute right-3.5 top-3.5">
            <SwitchCamera className="size-14 text-white" />
          </Button>
          <View className="absolute inset-x-0 bottom-0 h-24">
            <Button
              variant="ghost"
              size="icon"
              onPress={takePicture}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <Aperture className="text-white" size={48} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onPress={() => router.push("/image-preview")}
              className="absolute top-1/2 -translate-y-1/2 right-8">
              <GalleryThumbnails className="text-white" size={48} />
            </Button>
          </View>
        </CameraView>
      )}
    </SafeAreaView>
  );
}

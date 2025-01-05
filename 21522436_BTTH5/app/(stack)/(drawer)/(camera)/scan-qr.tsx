import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView, Text, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';

import { Aperture } from '~/lib/icons';
import { Button } from '~/components/ui/button';
import { useFocusEffect } from '@react-navigation/native';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useFocusEffect(
    useCallback(() => {
      setIsCameraVisible(true);
      return () => setIsCameraVisible(false);
    }, [])
  );

  const handleBarCodeScanned = useCallback(
    ({ type, data }: any) => {
      if (isScanning) {
        setScannedData(data);
        setIsScanning(false);
      }
    },
    [isScanning]
  );

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex flex-1">
        <View className="flex flex-1 justify-center">
          <Text className="pb-10 text-center">We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <Text>Grant permission</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const resetScanner = () => {
    setIsScanning(true);
    setScannedData(null);
  };

  return (
    <SafeAreaView className="flex flex-1">
      {isCameraVisible && (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}>
          {/* QR Scanner Overlay */}
          <View className="absolute inset-0 flex items-center justify-center">
            <View className="h-64 w-64 rounded-lg border-2 border-white">
              <View className="absolute inset-0 flex items-center justify-center">
                <Aperture className="size-8 text-white opacity-50" />
              </View>
            </View>
            <Text className="mt-4 text-center text-white">
              {!scannedData ? 'Position QR code within the frame' : ''}
            </Text>
          </View>
        </CameraView>
      )}

      <View className="absolute inset-x-0 bottom-32">
        {scannedData && (
          <Button
            variant="ghost"
            onPress={resetScanner}
            className="mx-auto bg-white/20 backdrop-blur-sm">
            <Text className="text-white">Tap to scan again</Text>
          </Button>
        )}
      </View>

      {scannedData && (
        <View className="absolute inset-x-0 bottom-64 px-4">
          <View className="rounded-lg bg-white/20 p-4 backdrop-blur-sm">
            <Text className="text-center text-white">Scanned QR Code: {scannedData}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

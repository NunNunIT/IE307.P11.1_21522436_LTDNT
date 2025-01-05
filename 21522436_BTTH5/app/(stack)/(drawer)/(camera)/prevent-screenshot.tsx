import { Alert, AlertTitle } from '~/components/deprecated-ui/alert';
import { Platform, SafeAreaView, View } from 'react-native';
import { allowScreenCaptureAsync, preventScreenCaptureAsync } from 'expo-screen-capture';
import { useCallback, useState } from 'react';

import { AlertCircle } from '~/lib/icons';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { Text } from '@/components/ui/text';

export default function ScreenCaptureSettings() {
  const [isPreventing, setIsPreventing] = useState(false);

  const togglePreventing = useCallback(async () => {
    try {
      if (!isPreventing)
        await preventScreenCaptureAsync();
      else
        await allowScreenCaptureAsync();

      setIsPreventing((prev) => !prev);
    } catch { }
  }, [isPreventing]);

  return (
    <SafeAreaView className="flex-1 justify-center bg-background">
      {Platform.OS !== 'android' && (
        <View className="p-4">
          <Alert variant="destructive" icon={AlertCircle}>
            <AlertTitle>This feature is only available on Android</AlertTitle>
          </Alert>
        </View>
      )}
      <View className="p-4">
        <Button
          onPress={togglePreventing}
          variant="ghost"
          className="w-full flex-row items-center justify-between rounded-lg bg-card p-4">
          <View className="flex-row items-center space-x-3">
            <Text className="text-base font-medium">Prevent Screenshots</Text>
          </View>
          <Switch checked={isPreventing} onCheckedChange={togglePreventing} className="ml-auto" />
        </Button>
      </View>
    </SafeAreaView>
  );
}

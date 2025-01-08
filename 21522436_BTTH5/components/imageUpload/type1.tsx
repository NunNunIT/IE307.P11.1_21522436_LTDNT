import React, { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { View, Modal, Dimensions } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import {
  SwitchCamera,
  X,
  Zap,
  ZapOff,
  ImageIcon,
  CameraIcon,
} from "@/lib/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const { width } = Dimensions.get("window");

interface ImageUploadProps {
  onImageSelect: (imagePath: string) => void;
  triggerContent?: JSX.Element;
}

export default function ImageUploadType1({
  onImageSelect,
  triggerContent,
}: ImageUploadProps) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>("off");

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      onImageSelect(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onImageSelect(photo.uri);
      setCameraVisible(false);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center items-center p-16">
        <Text>Chúng tôi cần quyền truy cập camera để hiển thị camera.</Text>
        <Button onPress={requestPermission}>
          <Text>Cấp quyền</Text>
        </Button>
      </View>
    );
  }

  const renderTriggers = () => {
    return (
      triggerContent || (
        <Button variant="outline">
          <Text>Upload Image</Text>
        </Button>
      )
    );
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>{renderTriggers()}</DialogTrigger>
        <DialogContent style={{ width: width * 0.5 }}>
          <DialogHeader>
            <DialogTitle>Đăng tải hình ảnh</DialogTitle>
            <View className="flex flex-col justify-center items-center gap-6 mt-6">
              <Button variant="secondary" className="w-full" onPress={pickImage}>
                <View className="flex flex-row gap-2">
                  <ImageIcon className="text-black dark:text-white size-6" />
                  <Text className="">Chọn Ảnh</Text>
                </View>
              </Button>
              <Button variant="secondary" className="w-full" onPress={() => setCameraVisible(true)}>
                <View className="flex flex-row gap-2">
                  <CameraIcon className="text-black dark:text-white size-6" />
                  <Text className="">Mở camera</Text>
                </View>
              </Button>
            </View>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraVisible}
        onRequestClose={() => setCameraVisible(false)}
      >
        <View className="flex-1 bg-white">
          <CameraView className="flex-1" facing={facing} ref={cameraRef}>
            <View className="w-full h-full relative">
              <View className="absolute top-2 left-2 flex flex-row gap-3">
                <Button variant="none" onPress={toggleFlashMode}>
                  {flashMode === "off" ? (
                    <Zap className="text-white/80 size-20" />
                  ) : (
                    <ZapOff className="text-white/80 size-20" />
                  )}
                </Button>
                <Button variant="none" onPress={toggleCameraFacing}>
                  <SwitchCamera className="text-white/80 size-20" />
                </Button>
              </View>

              <View className="absolute bottom-5 w-full justify-center items-center">
                <Button
                  size="icon"
                  className="rounded-full size-24 border-2 border-white/60 p-2 bg-transparent"
                  variant="none"
                  onPress={takePhoto}
                >
                  <View className="rounded-full size-20 bg-white/70"></View>
                </Button>
              </View>

              <Button
                variant="none"
                className="absolute top-2 right-2"
                onPress={() => setCameraVisible(false)}
              >
                <X className="text-white/60 size-20" />
              </Button>
            </View>
          </CameraView>
        </View>
      </Modal>
    </View>
  );
}
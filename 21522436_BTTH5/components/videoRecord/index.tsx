import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Platform, Alert } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { SwitchCamera } from "@/lib/icons";

const VideoRecordComponent = ({ onVideoRecorded }) => {
  const [facing, setFacing] = useState("back" as CameraType);
  const [permission, requestPermission] = useCameraPermissions();
  const [microphonePermission, requestPermissionMic] = useMicrophonePermissions();
  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const askForMicrophonePermissions = async () => {
    try {
      if (Platform.OS !== "web") {
        let finalStatus = microphonePermission?.status;
        if (finalStatus !== "granted") {
          const { status } = await requestPermissionMic();
          finalStatus = status;
        }
        return finalStatus === "granted";
      }
      return true;
    } catch (e) {
      console.log("Error in asking for microphone permissions", e);
      return false;
    }
  };

  const record = async () => {
    const hasMicrophonePermission = await askForMicrophonePermissions();
    if (!hasMicrophonePermission) {
      Alert.alert(
        "Permission Required",
        "Microphone access is required to record video. Please enable it in your device settings."
      );
      return;
    }

    if (cameraRef.current) {
      try {
        if (!recording) {
          setRecording(true);

          const video = await cameraRef.current.recordAsync({
            maxDuration: 5,
            quality: "480p",
          });

          setRecording(false);
          onVideoRecorded(video);
        } else {
          setRecording(false);
          cameraRef?.current?.stopRecording();
        }
      } catch (e) {
        console.log("Error recording video", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}
        mode="video"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity className="top-2 left-2" onPress={toggleCameraFacing}>
            <SwitchCamera className="text-white/80 size-24" />
          </TouchableOpacity>

          <View className="absolute bottom-5 w-full justify-center items-center">
            <TouchableOpacity
              className={`flex justify-center items-center rounded-full size-24 border-2 border-white/60 p-2 bg-transparent`}
              onPress={record}
            >
              <View
                className={`rounded-full size-20 ${
                  recording ? "bg-red-500" : "bg-white/70"
                }`}
              ></View>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
  },
});

export default VideoRecordComponent;

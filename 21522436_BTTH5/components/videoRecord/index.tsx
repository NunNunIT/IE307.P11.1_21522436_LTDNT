// VideoRecordComponent.tsx
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import {
  SwitchCamera,
} from "@/lib/icons";

const VideoRecordComponent = ({ onVideoRecorded }) => {
  const [facing, setFacing] = useState("back" as CameraType);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [microphonePermission, requestPermissionMic] =
    useMicrophonePermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
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
        if (finalStatus !== "granted") {
          return false;
        }
        return true;
      }
    } catch (e) {
      console.log("Error in asking for microphone permissions", e);
    }
  };

  const record = async () => {
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
                className={`rounded-full size-20  ${
                  recording ? "bg-red-500" : "bg-white/70"
                } `}
              ></View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={askForMicrophonePermissions}
          >
            <Text style={styles.text}>Request Mic Perm</Text>
          </TouchableOpacity> */}
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
  video: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  button2: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default VideoRecordComponent;

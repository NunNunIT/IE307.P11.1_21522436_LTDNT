import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Button } from "~/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";

export default function App() {
  const video = useRef<Video>(null);
  const secondVideo = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>();
  const [statusSecondVideo, setStatusSecondVideo] =
    useState<AVPlaybackStatus | null>(null);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="h-full flex items-center justify-start bg-white dark:bg-black p-2">
        <Text className="text-2xl font-bold my-2">Remote link video</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />

        <View className="my-4 flex flex-row items-center justify-center gap-3">
          <Button onPress={() => video.current?.playFromPositionAsync(5000)}>
            <Text>Play from 5s</Text>
          </Button>
          <Button
            onPress={() =>
              video.current?.setIsLoopingAsync(
                "isLooping" in (status ?? {})
                  ? !(status as AVPlaybackStatusSuccess)?.isLooping
                  : false
              )
            }
          >
            <Text>
              {(status as AVPlaybackStatusSuccess)?.isLooping
                ? "Set to not loop"
                : "Set to loop"}
            </Text>
          </Button>
        </View>

        <Text className="text-2xl font-bold my-2">Local video</Text>
        <Video
          ref={secondVideo}
          style={styles.video}
          source={require("~/assets/video/HelloVietNam.mp4")}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatusSecondVideo}
        />
        <View className="my-4 flex flex-row items-center justify-center gap-3">
          <Button
            onPress={() => secondVideo.current?.playFromPositionAsync(50000)}
          >
            <Text>Play from 50s</Text>
          </Button>
          <Button
            onPress={() =>
              secondVideo.current?.setIsLoopingAsync(
                "isLooping" in (statusSecondVideo ?? {})
                  ? !(statusSecondVideo as AVPlaybackStatusSuccess)?.isLooping
                  : false
              )
            }
          >
            <Text>
              {(statusSecondVideo as AVPlaybackStatusSuccess)?.isLooping
                ? "Set to not loop"
                : "Set to loop"}
            </Text>
          </Button>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});

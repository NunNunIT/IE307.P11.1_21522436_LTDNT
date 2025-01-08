import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "@/components/ui/text";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const MediaDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Get the media ID from the route
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [media, setMedia] = useState(null); // Media details
  const videoRef = useRef(null); // Ref for Video component
  const navigation = useNavigation(); // For setting the header title

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access media library is required!");
          setIsLoading(false);
          return;
        }

        const asset = await MediaLibrary.getAssetInfoAsync(id);
        setMedia(asset || null);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMedia();
    }
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      title: media?.filename || "Media Detail", // Ensure title is updated consistently
    });
  }, [media?.filename, navigation]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#fe183c" />
      </View>
    );
  }

  if (!media) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No media found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {media.mediaType === "photo" ? (
        <Image
          source={{ uri: media.uri }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: media.uri }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          onError={(error) => console.error("Video error:", error)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: "100%",
  },
  video: {
    width: width - 40,
    height: (width - 40) * 0.5625, // Aspect ratio of 16:9
  },
});

export default MediaDetailScreen;

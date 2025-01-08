import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import VideoCard from "@/components/card/media";

export default function TabTwoScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  // Fetch media files from the device
  const fetchMediaFiles = async () => {
    try {
      setLoading(true);

      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied");
        return;
      }

      // Fetch media files (limit to 15 files)
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo", "video"],
        first: 15,
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      setMediaFiles(media.assets);
    } catch (error) {
      console.error("Error fetching media files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMediaFiles();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={mediaFiles}
          renderItem={({ item }) => (
            <View className="m-2">
              <VideoCard item={item} />
            </View>
          )}
          keyExtractor={(item) => item.uri}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: 'center'
  },
  loader: {
    marginTop: 20,
  },
  grid: {
    justifyContent: "space-between",
  },
  videoContainer: {
    position: "relative",
  },
});

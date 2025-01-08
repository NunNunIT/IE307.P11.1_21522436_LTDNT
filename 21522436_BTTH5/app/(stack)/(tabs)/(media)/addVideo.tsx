import { Video } from 'expo-av';
import { Alert } from 'react-native';
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import VideoRecordComponent from '@/components/videoRecord';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

const AddVideoScreen = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Notification Permission', 'Permission to send notifications is required.');
        return false;
      }
      return true;
    } catch (error) {
      console.log('Error requesting notification permissions:', error);
      return false;
    }
  };

  const showNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Video Saved",
          body: "Your video has been successfully saved to the device",
        },
        trigger: null,
      });
    } catch (error) {
      console.log('Error showing notification:', error);
    }
  };

  const handleVideoRecorded = (video) => {
    if (video?.uri) {
      setVideoUri(video.uri);
      setShowCamera(false);
    } else {
      Alert.alert('Error', 'Failed to record video');
    }
  };

  const handleReRecord = () => {
    setVideoUri(null);
    setShowCamera(true);
  };

  const handleSave = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'No video to save');
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(videoUri);
        await showNotification();
        router.replace("/gallery");
      } else {
        Alert.alert('Permission Required', 'Please grant permission to save videos');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save video');
      console.log('Error saving video:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <VideoRecordComponent onVideoRecorded={handleVideoRecorded} />
      ) : (
        <View style={styles.container}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            onError={(error) => console.log('Video playback error:', error)}
          />
          <View style={styles.buttonContainer}>
            <Button style={styles.button2} onPress={handleReRecord}>
              <Text>Re-Record</Text>
            </Button>
            <Button style={styles.button2} onPress={handleSave}>
              <Text>Save</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button2: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});

export default AddVideoScreen;

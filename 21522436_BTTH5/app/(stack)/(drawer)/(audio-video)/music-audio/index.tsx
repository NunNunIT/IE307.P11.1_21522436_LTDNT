import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { Audio } from "expo-av";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Trash } from "~/lib/icons/IconList";

export default function App() {
  const [currentPlayingSound, setCurrentPlayingSound] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null); // Đang phát âm thanh nào
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);

  // Danh sách các đoạn âm thanh
  const audioList = [
    {
      title: "Play mp3 sound from Local",
      isRequire: true,
      url: require("~/assets/sound/music.mp3"),
    },
    {
      title: "Play mp3 sound from remote URL",
      url: "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
    },
    {
      title: "Play aac sound from Local",
      isRequire: true,
      url: require("~/assets/sound/pew2.aac"),
    },
    {
      title: "Play aac sound from remote URL",
      url: "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac",
    },
  ];

  // Hàm xử lý Play/Stop
  const toggleSound = async (url, isRequire, index) => {
    try {
      // Nếu đang phát bài này thì dừng
      if (playingTrack === index) {
        if (currentPlayingSound) {
          await currentPlayingSound.stopAsync(); // Dừng âm thanh
          await currentPlayingSound.unloadAsync(); // Giải phóng bộ nhớ
          setCurrentPlayingSound(null);
        }
        setPlayingTrack(null); // Đặt trạng thái là không phát bài nào
      } else {
        // Nếu đang phát bài khác, dừng âm thanh hiện tại
        if (currentPlayingSound) {
          await currentPlayingSound.stopAsync();
          await currentPlayingSound.unloadAsync();
        }

        // Phát bài mới
        const { sound } = await Audio.Sound.createAsync(
          isRequire ? url : { uri: url }
        );
        setCurrentPlayingSound(sound);
        setPlayingTrack(index); // Cập nhật trạng thái bài đang phát
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error toggling sound:", error);
    }
  };

  // Bắt đầu ghi âm
  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {}
  }

  // Dừng ghi âm
  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    const allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(allRecordings);
  }

  // Chuyển đổi thời gian (miligiây) thành định dạng phút:giây (ví dụ: 2:05).
  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  // Hiển thị danh sách các đoạn ghi âm.
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View
          key={index}
          className="mb-4 flex w-full flex-row items-center justify-between"
        >
          <Text>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()}>
            <Text>Play</Text>
          </Button>
        </View>
      );
    });
  }

  // Xóa toàn bộ danh sách ghi âm
  function clearRecordings() {
    setRecordings([]);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full items-center justify-center bg-white px-6 dark:bg-black">
        <Text className="text-2xl font-bold my-2"> Play Sound/Audio</Text>
        {/* Hiển thị danh sách âm thanh */}
        <View className="w-full">
          {audioList.map((item, index) => (
            <View
              key={index}
              className="mb-4 flex w-full flex-row items-center justify-between"
            >
              <Text>{item.title}</Text>
              <Button
                onPress={() => toggleSound(item.url, item.isRequire, index)}
              >
                <Text>{playingTrack === index ? "Stop" : "Play"}</Text>
              </Button>
            </View>
          ))}
        </View>

        <Text className="text-2xl font-bold my-2 text-center"> Play Recording</Text>
        <View className="mt-8 w-full">
          <View className="mb-4 flex w-full items-end justify-end">
            {recordings.length > 0 && (
              <Button variant="destructive" onPress={clearRecordings}>
                <View className="flex flex-row items-center justify-center gap-3">
                  <Text>Delete All</Text>
                  <Trash className="size-8 text-white" />
                </View>
              </Button>
            )}
          </View>

          {getRecordingLines()}
          <Button onPress={recording ? stopRecording : startRecording}>
            <Text>{recording ? "... Stop Recording" : "Start Recording"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

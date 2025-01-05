import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { Audio } from "expo-av";
import { Button } from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GOOGLE_SPEECH_TO_TEXT_API_KEY } from "@/constants";
import { Switch } from "@/components/ui/switch";

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedSpeech, setTranscribedSpeech] = useState("");

  // Phương thức chuyển đổi ngôn ngữ
  const [language, setLanguage] = useState("en-US");

  // Hàm chuyển đổi file audio thành base64
  const fileToBase64 = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(
          typeof reader.result === "string"
            ? reader.result?.split(",")[1]
            : null);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting file to base64:", error);
      return null;
    }
  };

  // Hàm bắt đầu ghi âm
  const startRecording = async () => {
    try {
      if (isRecording) {
        console.log("Recording is already in progress.");
        return;
      }

      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission required",
          "Microphone access is required to record audio."
        );
        return;
      }

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Hàm dừng ghi âm
  const stopRecording = async () => {
    if (!isRecording) {
      console.log("No recording is in progress.");
      return;
    }

    setIsRecording(false);
    setIsTranscribing(true);

    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) {
        console.error("No URI generated from recording.");
        return;
      }

      const base64Audio = await fileToBase64(uri);
      if (base64Audio && typeof base64Audio === "string") {
        await transcribeSpeech(base64Audio);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Hàm fetch API để chuyển giọng nói thành văn bản
  const transcribeSpeech = async (
    base64Audio: string,
    encoding = "MP3",
    sampleRateHertz = 16000,
    languageCode = language,
    enableAutomaticPunctuation = true,
    model = "default"
  ) => {
    try {
      const audioConfig = {
        encoding,
        sampleRateHertz,
        languageCode,
        enableAutomaticPunctuation,
        model: model,
      };

      const response = await fetch(
        "https://speech.googleapis.com/v1/speech:recognize",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-goog-api-key": GOOGLE_SPEECH_TO_TEXT_API_KEY,
          },
          body: JSON.stringify({
            audio: { content: base64Audio },
            config: audioConfig,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Google Speech-to-Text API error: ${response.statusText}`
        );
      }

      const speechResults = await response.json();
      const transcription =
        speechResults?.results?.[0]?.alternatives?.[0]?.transcript ||
        "No transcription found";
      setTranscribedSpeech(transcription);
    } catch (error) {
      console.error("Error during transcription:", error instanceof Error ? error.message || error : "An error occurred during transcription.");
      setTranscribedSpeech("An error occurred during transcription.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-5 h-full w-full">
        <View className="gap-8 h-full flex justify-center flex-grow">
          <Text className="text-3xl p-1 font-bold text-center mb-5">
            Welcome to the Speech-to-Text App
          </Text>
          <View className="mb-4 flex flex-row items-center justify-between">
            <Text>
              Switch Language ({language === "vi-VI" ? "Vietnamese" : "English"}
              )
            </Text>
            <Switch
              onCheckedChange={() =>
                setLanguage(language === "en-US" ? "vi-VI" : "en-US")
              }
              checked={language === "vi-VI"}
            />
          </View>
          <View className="bg-gray-200 w-full h-[300px] p-5 rounded-lg flex items-start justify-between">
            {isTranscribing ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text
                className={`text-xl p-1 text-black text-left w-full            
                  ${transcribedSpeech ? "text-black" : "text-black/50"}
                `}
              >
                {transcribedSpeech ||
                  "Your transcribed text will be shown here"}
              </Text>
            )}
          </View>

          <View className="flex items-center justify-between">
            <Button
              className={`bg-red-500 size-24 rounded-full placeholder:${isRecording || isTranscribing ? "opacity-50" : ""
                }`}
              size="icon"
              onPress={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing}
            >
              {isRecording ? (
                <FontAwesome name="square" size={40} color="white" />
              ) : (
                <FontAwesome name="microphone" size={40} color="white" />
              )}
            </Button>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

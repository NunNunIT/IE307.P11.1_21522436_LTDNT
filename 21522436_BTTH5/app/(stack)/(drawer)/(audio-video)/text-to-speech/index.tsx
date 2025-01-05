import * as Speech from "expo-speech";

import { Button } from "~/components/ui/button";
import { ENUM_LOCALE } from "@/constants";
import { Input } from "~/components/ui/input";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Text } from "~/components/ui/text";
import { ScrollView, View } from "react-native";

export default class App extends React.Component {
  viTextData = [{ id: 2, content: "1 2 3 4 5 Alo Alo Xin chào" }];

  enTextData = [{ id: 1, content: "1 2 3 4 5 Alo Alo Hello" }];

  state = {
    inputValue: "",
    language: ENUM_LOCALE.VI, // Ngôn ngữ mặc định là tiếng Việt
    voices: [] as any[], // Danh sách giọng nói
    isPaused: false, // Trạng thái tạm dừng
  };

  componentDidMount() {
    this.loadVoices();
  }

  // Lấy danh sách các giọng đọc trên thiết bị
  async loadVoices() {
    const voices = await Speech.getAvailableVoicesAsync();
    this.setState({ voices });
  }

  // Lấy giọng đọc phù hợp với ngôn ngữ
  getVoiceForLanguage(language: ENUM_LOCALE) {
    const { voices } = this.state;
    return voices.find((voice) => voice.language.startsWith(language));
  }

  // Phương thức đọc văn bản
  speak(text: string, language: ENUM_LOCALE) {
    const voice = this.getVoiceForLanguage(language);
    const options = voice ? { voice: voice.identifier } : { language };

    // Reset trạng thái khi phát lại văn bản
    this.setState({ isPaused: false });
    Speech.speak(text, options);
  }

  // Dừng phát
  stopSpeech = () => {
    Speech.stop();
    this.setState({ isPaused: false });
  };

  // Phương thức chuyển đổi ngôn ngữ
  toggleLanguage = () => {
    this.setState((prevState: { language: ENUM_LOCALE }) => ({
      language:
        prevState.language === ENUM_LOCALE.VI ? ENUM_LOCALE.EN : ENUM_LOCALE.VI,
    }));
  };

  handleInputChange = (text: String) => {
    this.setState({ inputValue: text });
  };

  render() {
    const { inputValue, language, isPaused } = this.state;

    return (
      <ScrollView>
        <View className="w-full items-center justify-center bg-white p-4 dark:bg-black">
          <View className="w-full">
            <Text className="mb-2 text-2xl font-bold text-center">
              Sample Text to Speech (Vietnamese)
            </Text>
            {this.viTextData.map((item) => (
              <View
                key={item.id}
                className="mb-4 flex w-full flex-row justify-between rounded border-2 border-zinc-200 p-4 dark:border-zinc-800"
              >
                <Text className="w-2/3">{item.content}</Text>
                <Button
                  variant="secondary"
                  onPress={() => this.speak(item.content, ENUM_LOCALE.VI)}
                >
                  <Text>Speech</Text>
                </Button>
              </View>
            ))}
            <Text className="mb-2 text-2xl font-bold text-center">
              Sample Text to Speech (English)
            </Text>
            {this.enTextData.map((item) => (
              <View
                key={item.id}
                className="mb-4 flex w-full flex-row justify-between rounded border-2 border-zinc-200 p-4 dark:border-zinc-800"
              >
                <Text className="w-2/3">{item.content}</Text>
                <Button
                  variant="secondary"
                  onPress={() => this.speak(item.content, ENUM_LOCALE.EN)}
                >
                  <Text>Speech</Text>
                </Button>
              </View>
            ))}
          </View>
          <View className="w-full">
            <Text className="mb-2 text-2xl font-bold text-center">
              Text to Speech
            </Text>
            <View className="mb-4 flex flex-row items-center justify-between">
              <Text>
                Switch Language (
                {language === ENUM_LOCALE.VI ? "Vietnamese" : "English"})
              </Text>
              <Switch
                onCheckedChange={this.toggleLanguage}
                checked={language === ENUM_LOCALE.VI}
              />
            </View>
            <Input
              className="mb-4 w-full"
              placeholder="Type something..."
              value={inputValue}
              onChangeText={this.handleInputChange}
            />
            <Button onPress={() => this.speak(inputValue, language)}>
              <Text>Press to hear some words from input</Text>
            </Button>
            <View className="flex flex-row gap-3 mt-3 items-center w-full justify-center">
              <Button variant="destructive" onPress={this.stopSpeech}>
                <Text>Stop</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

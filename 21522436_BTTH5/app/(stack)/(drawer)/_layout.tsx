import { Camera, Construction, Fullscreen, ScanQrCode } from "~/lib/icons";

import DarkModeText from "~/components/darkModeOption/text";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Text } from "react-native";
import { View } from "react-native";

const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{
      headerRight: () => <DarkModeText />,
    }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Part 1: Camera
        </Text>
      </View>
      <Drawer.Screen
        name="(camera)/index"
        options={{
          headerTitle: "Camera",
          drawerLabel: "Camera",
          drawerIcon: ({ color }) => <Camera color={color} size={28} />,
        }}
      />
      <Drawer.Screen
        name="(camera)/scan-qr"
        options={{
          headerTitle: "Scan QR",
          drawerLabel: "Scan QR",
          drawerIcon: ({ color }) => (
            <ScanQrCode color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="(camera)/screenshot"
        options={{
          headerTitle: "Screenshot",
          drawerLabel: "Screenshot",
          drawerIcon: ({ color }) => (
            <Fullscreen color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="(camera)/prevent-screenshot"
        options={{
          headerTitle: "Prevent Screenshot",
          drawerLabel: "Prevent Screenshot",
          drawerIcon: ({ color }) => (
            <Construction color={color} size={28} />
          ),
        }}
      />

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          Part 2: Audio-Video
        </Text>
      </View>
      <Drawer.Screen
        name="(audio-video)/music-audio/index"
        options={{
          headerTitle: "Play Audio",
          drawerLabel: "Play Audio",
          drawerIcon: ({ color }) => (
            <Icon name="music" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(audio-video)/video/index"
        options={{
          headerTitle: "Play Video",
          drawerLabel: "Play Video",
          drawerIcon: ({ color }) => (
            <Icon name="film" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(audio-video)/text-to-speech/index"
        options={{
          headerTitle: "Text to Speech",
          drawerLabel: "Text to Speech",
          drawerIcon: ({ color }) => (
            <View className="-mr-1">
              <Icon name="volume-up" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="(audio-video)/speech-to-text/index"
        options={{
          headerTitle: "Speech to Text",
          drawerLabel: "Speech to Text",
          drawerIcon: ({ color }) => (
            <View className="flex items-center justify-center w-[28]">
              <Icon name="microphone-alt" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

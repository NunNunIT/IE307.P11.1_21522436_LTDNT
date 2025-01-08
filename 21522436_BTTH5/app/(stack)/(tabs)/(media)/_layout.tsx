import { FontAwesome } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Button } from "~/components/ui/button";
// import { Video } from '~/lib/icons/Video';

export default function MediaLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="gallery"
        options={{
          title: "My Gallery",
          headerRight: ({ tintColor }) => (
            <TouchableOpacity
              onPress={() => router.push(`/addVideo`)}
              className="p-2 aspect-square"
            >
              <FontAwesome name="plus-circle" size={24} color={tintColor} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="videoDetail/[id]" />

      <Stack.Screen
        name="addVideo"
        options={{
          title: "Add New Video",
        }}
      />
    </Stack>
  );
}

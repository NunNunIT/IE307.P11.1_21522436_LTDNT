// components/LocateSelector.tsx
import { useState, useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "../ui/button";
import { useLocationStore, LocationType } from "./locationStore";
import { Text } from "../ui/text";

export default function CurrentLocateSelector() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setSelectedLocation } = useLocationStore();

  const getCurrentLocation = async () => {
    console.log("currentLocation")
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Tính năng này không hoạt động trên Android Emulator. Vui lòng thử trên thiết bị thật!"
      );
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Quyền truy cập vị trí bị từ chối");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const response = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=vi&apiKey=JvbPZTuHiSKY7roWnFo4_VhjKfvcHQzadwKAg-HI0pc`
      );

      const address = await response.json();

      await setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: address.items[0].title,
      });
    } catch (error) {
      setErrorMsg("Lỗi khi lấy vị trí");
    }
  };

  return (
    <Button className="flex flex-row" onPress={getCurrentLocation}>
      <MaterialIcons name="my-location" size={24} color="white" />
      <Text>Vị trí hiện tại</Text>
    </Button>
  );
}


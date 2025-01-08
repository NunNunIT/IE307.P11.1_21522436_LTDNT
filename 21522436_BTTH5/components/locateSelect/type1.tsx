// components/LocateSelector.tsx
import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "../ui/button";
import { useLocationStore, LocationType } from "./locationStore";

export default function LocateSelector() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { selectedLocation, setSelectedLocation } = useLocationStore();

  const getCurrentLocation = async () => {
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
      
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: address.items[0].title,
      });
    } catch (error) {
      setErrorMsg("Lỗi khi lấy vị trí");
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : selectedLocation ? (
        <>
          <Text style={styles.locationText}>
            Vĩ độ: {selectedLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Kinh độ: {selectedLocation.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Địa chỉ: {selectedLocation.title}
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapPreview}
            region={{
              ...selectedLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={selectedLocation}
              title={selectedLocation.title}
            />
          </MapView>
        </>
      ) : (
        <View className="w-full h-48 mt-4 rounded-lg border-zinc-600 border-dashed border-2 justify-center items-center">
          <Text className="text-center">Chọn phương thức xác định vị trí</Text>
        </View>
      )}

      <View className="mt-8 flex flex-row flex-wrap justify-around gap-8">
        <Button className="flex flex-row" onPress={getCurrentLocation}>
          <MaterialIcons name="my-location" size={24} color="white" />
          <Text style={styles.buttonText}>Vị trí hiện tại</Text>
        </Button>

        <Button
          className="flex flex-row"
          onPress={() => router.push("/map")}
        >
          <MaterialIcons name="map" size={24} color="white" />
          <Text style={styles.buttonText}>Chọn trên bản đồ</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  mapPreview: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 15,
  }
});
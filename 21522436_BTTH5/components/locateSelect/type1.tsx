import { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "../ui/button";

type LocationType = {
  latitude: number;
  longitude: number;
  title: string;
};

export default function LocateSelector({
  onLocationSelect,
}: {
  onLocationSelect: (location: LocationType) => void;
}) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isMapMode, setIsMapMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  );

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
      // console.log("locate", selectedLocation);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const response = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=vi&apiKey=JvbPZTuHiSKY7roWnFo4_VhjKfvcHQzadwKAg-HI0pc`
      );

      console.log(response);
      const address = await response.json(); // Chuyển phản hồi thành JSON
      console.log("AAA", address.items[0].title);

      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: address.items[0].title,
      });
    } catch (error) {
      setErrorMsg("Lỗi khi lấy vị trí");
    }
  };

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setIsMapMode(false);
    }
  };

  const MainScreen = () => (
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
            // scrollEnabled={false}
            // zoomEnabled={true}
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
          //   onPress={() => setIsMapMode(true)}
          onPress={() => router.push("/map")}
        >
          <MaterialIcons name="map" size={24} color="white" />
          <Text style={styles.buttonText}>Chọn trên bản đồ</Text>
        </Button>
      </View>
    </View>
  );

  const MapScreen = () => (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.fullMap}
        initialRegion={{
          latitude: selectedLocation?.latitude || 10.762622,
          longitude: selectedLocation?.longitude || 106.660172,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
        <MaterialIcons name="save" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return isMapMode ? <MapScreen /> : <MainScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  plainView: {
    width: 60,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    justifyContent: "center",
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
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  fullMap: {
    flex: 1,
  },
  saveButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
